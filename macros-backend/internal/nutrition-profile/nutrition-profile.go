package nutritionprofile

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	dynamoservice "github.com/ramenNoodles1998/macros-backend/internal/dynamo-service"
)

type NutritionProfileDB struct {
	//uuid
	PartitionKey string
	//date
	SortKey string
	Protein float64 
	Carbs float64
	Fat float64
	Calories float64
}

type NutritionProfile struct {
	Id string  `json:"id"`
	Sk string  `json:"sk"`
	Protein float64  `json:"protein"`
	Carbs float64  `json:"carbs"`
	Fat float64  `json:"fat"`
	Calories float64  `json:"calories"`
}

const tableName string = "dev-macros"
const uuidRoman string = "123123"
const NUTRITION_PROFILE_SORT_KEY string = "NUTRITION_PROFILE"

func SetNutritionProfileRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/save-nutrition-profile", saveNutritionProfile)
	mux.HandleFunc("/api/get-nutrition-profile", getNutritionProfile)
}

func saveNutritionProfile(w http.ResponseWriter, r *http.Request) {
	var np NutritionProfile

    err := json.NewDecoder(r.Body).Decode(&np)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

	var svc *dynamodb.DynamoDB = dynamoservice.DynamoService()

	var nutritionProfileDB = NutritionProfileDB {
		PartitionKey: uuidRoman,
		SortKey: NUTRITION_PROFILE_SORT_KEY,
		Protein: np.Protein,
		Carbs: np.Carbs,
		Fat: np.Fat,
		Calories: np.Calories,
	}

	nutritionProfile := NutritionProfile{
		Id: uuidRoman,
		Sk: NUTRITION_PROFILE_SORT_KEY,
		Protein: np.Protein,
		Carbs: np.Carbs,
		Fat: np.Fat,
		Calories: np.Calories,

	}

	av, err := dynamodbattribute.MarshalMap(nutritionProfileDB)
	if err != nil {
		fmt.Printf("Got error marshalling item: %s", err)
		return
	}

	input := &dynamodb.PutItemInput{
		Item: av,
		TableName: aws.String(tableName),
	}

	_, err = svc.PutItem(input)

	if err != nil {
		fmt.Printf("Got error calling PutItem: %s", err)
		return
	}

	json.NewEncoder(w).Encode(nutritionProfile)

}

func getNutritionProfile(w http.ResponseWriter, r *http.Request) {
	var svc *dynamodb.DynamoDB = dynamoservice.DynamoService()
	result, err := svc.Query(&dynamodb.QueryInput{
		TableName: aws.String(tableName),
		KeyConditions: map[string]*dynamodb.Condition{
			"PartitionKey": {
				ComparisonOperator: aws.String("EQ"),
				AttributeValueList: []*dynamodb.AttributeValue {
					{
						S: aws.String(uuidRoman),
					},
				},
			},
			"SortKey": {
				ComparisonOperator: aws.String("BEGINS_WITH"),
				AttributeValueList: []*dynamodb.AttributeValue {
					{
						S: aws.String(NUTRITION_PROFILE_SORT_KEY),
					},
				},
			},
			
		},
	})

	if err != nil {
		fmt.Printf("Got error calling GetItem: %s", err)
		return
	}

	var np = NutritionProfile {
		Id: uuidRoman,
		Sk: NUTRITION_PROFILE_SORT_KEY,
		Protein: 0,
		Carbs: 0,
		Fat: 0,
		Calories: 0,
	}
	if result.Items == nil || len(result.Items) == 0 {
		fmt.Printf("Could not find Daily Macro Total")
		json.NewEncoder(w).Encode(np)
		return
	}

	for _, item := range result.Items {
		npdb := NutritionProfileDB{}
		err = dynamodbattribute.UnmarshalMap(item, &npdb)
		np = NutritionProfile{
			Id: npdb.PartitionKey,
			Sk: npdb.SortKey,
			Protein: npdb.Protein,
			Carbs: npdb.Carbs,
			Fat: npdb.Fat,
			Calories: npdb.Calories,
		}
		if err != nil {
			panic(fmt.Sprintf("Failed to unmarshal Record, %v", err))
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(np)

}
