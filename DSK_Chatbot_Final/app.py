# General Modules
import re
import pandas as pd
import matplotlib.pyplot as plt
import os

# Modules Related to PDF Pre-Processing
import fitz
import os
import pdfplumber
from PyPDF2 import PdfReader, PdfWriter
from fpdf import FPDF
import PIL.Image

# Modules Related to PDF Processing
from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma

from langchain import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.chains import RetrievalQA,StuffDocumentsChain ,LLMChain

# Modules Related to SQL Processing 
import psycopg2
import urllib
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain.agents import create_sql_agent
from langchain.agents.agent_types import AgentType

from statsmodels.tsa.arima.model import ARIMA


from langchain.vectorstores import FAISS
from langchain.document_loaders import UnstructuredExcelLoader





#smple
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI

# MODEL RELATED

# Modules Related to AzureOpenAI
from langchain.chat_models import AzureChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings


# import json
# with open('Azure.json') as f:
#     Azure=json.load(f)


# # Define AzureOpenAI Model and Embedding Model
# chat_model = AzureChatOpenAI(openai_api_base=Azure['api_base'],
#                   azure_deployment=Azure['deployment_name'],
#                   openai_api_key=Azure['api_key'],
#                   openai_api_type=Azure['api_type'],
#                   openai_api_version=Azure["api_version"],        
#                     seed=1234,
#                  temperature = 0)



# embeddings =OpenAIEmbeddings(
#     deployment=Azure['embedding_name'],
#     model=Azure['embedding_model'],
#     openai_api_base=Azure['api_base'],
#     openai_api_type=Azure['api_type'],
#     openai_api_key=Azure['api_key'],
#     chunk_size = 10
# )




# PDF PROCESSING
#Load The PDF Documents


path = os.getcwd()
print(path)

files_name1 = "Centrifugal Air Compressor Troubleshooting Guide 2.pdf"
files_name2 = "17DA-3SS 1.pdf"
files_name3 = "Air_Compressor_Startup_Shutdown_Normal_Operation 1.pdf"

a = os.path.join(path, files_name1)
b = os.path.join(path, files_name2)
c = os.path.join(path, files_name3)

loaders = [

#      PyPDFLoader("C:/Users/40019115/geminiAPI/Centrifugal Air Compressor Troubleshooting Guide 2.pdf"),
#     PyPDFLoader("C:/Users/40019115/geminiAPI//17DA-3SS 1.pdf"),
#     PyPDFLoader("C:/Users/40019115/geminiAPI//Air_Compressor_Startup_Shutdown_Normal_Operation 1.pdf")
    PyPDFLoader(a),
    PyPDFLoader(b),
    PyPDFLoader(c),
    
]
docs = []
for loader in loaders:
    docs.extend(loader.load())
# print("docs---->",docs)
# 2.Gemini API Key
GOOGLE_API_KEY = 'AIzaSyBIBaI7Cr-bINi-cRK9BHa2rUMK2MpqONQ'
# Define Model and Embedding Model
model = GoogleGenerativeAI(model="gemini-pro", temperature=0.3, google_api_key=GOOGLE_API_KEY)
chat_model = ChatGoogleGenerativeAI(model="gemini-pro",google_api_key=GOOGLE_API_KEY,)
embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001",google_api_key=GOOGLE_API_KEY)




chunk_size=400

# Define Splitter and Vector DB
child_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size)

vectorstore = Chroma(
    collection_name="full_documents", embedding_function=embeddings
)
print("Model----->",model)
print("embeddings------>",embeddings)
print("chat_model----->",chat_model)
print("chunk_size----->",chunk_size)
# Split the Document and Store it in Vector DB
store = InMemoryStore()
retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=store,
    child_splitter=child_splitter,
)

retriever.add_documents(docs, ids=None)
retrieved_docs = retriever.get_relevant_documents("purpose of TWO STAGE CL2 COMPRESSOR STARTUP AND SHUTDOWN (PSM)")

retrieved_docs
prompt_template = """
  Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
  provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
  Context:\n {context}?\n
  Question: \n{question}\n 
  Answer: 
"""
prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"]) 
def get_answer_from_pdf(user_query):
    print("get_answer_from_pdf------>")
    retrieved_docs = retriever.get_relevant_documents(user_query)
    context = retrieved_docs[0].page_content
    qa_retreival = LLMChain(llm=chat_model,prompt=prompt)
    response = qa_retreival.invoke({"context": context, "question": user_query})
    print("response_text",response["text"])
    return response["text"]
# SQL PROCESSING
import sqlite3
import matplotlib.pyplot as plt
conn = sqlite3.connect('database_new.db')


# # username = "postgres"
# # password = "A#F@2023"
# # host = "35.208.159.230"
# # port = "8090"
# # mydatabase = "assetdb"



# host="localhost"
# port="5432"
# mydatabase="AHF_Project"
# password="root"
# username="postgres"
 
# #establishing the connection
# conn = psycopg2.connect(database="AHF_Project",user='postgres', password='root', host='localhost', port= "5432")
# print("connection",conn)


    
    

# encoded_password = urllib.parse.quote("root")
 
# db = SQLDatabase.from_uri(
#     f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{mydatabase}"
# )
 
# agent_executor = create_sql_agent(
#     llm=model,
#     toolkit=SQLDatabaseToolkit(db=db, llm=model),
#     verbose=True,
#     agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
# )



# host="localhost"
# port="5432"
# mydatabase="AHF_Project"
# password="root"
# username="postgres"
 
# #establishing the connection
# conn = psycopg2.connect(database="AHF_Project",user='postgres', password='root', host='localhost', port= "5432")
# print("connection",conn)

 
# db = SQLDatabase.from_uri(
#     f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{mydatabase}"
# )
 
# agent_executor = create_sql_agent(
#     llm=model,
#     toolkit=SQLDatabaseToolkit(db=db, llm=model),
#     verbose=True,
#     agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
# )


graph_values=""
x_values_plot=[]
y_values_plot=[]

x1_values_compare_plot=[]
x11_values_compare_plot=[]
y1_values_compare_plot=[]



x2_values_compare_plot=[]
x22_values_compare_plot=[]
y2_values_compare_plot=[]

def get_sql_query_from_excel(query):
    n=0
    global x_values_plot
    global y_values_plot
    global x1_values_compare_plot
    global x11_values_compare_plot
    global y1_values_compare_plot
    
    global x2_values_compare_plot
    global x22_values_compare_plot
    global y2_values_compare_plot

    
    loader = UnstructuredExcelLoader(r"C:\Users\40019115\geminiAPI\Table Description.xlsx")
    docs = loader.load()
    vectorstore_db = FAISS.from_documents(docs,embeddings)
    embeddings_vector = embeddings.embed_query(query)
    docs = vectorstore_db.similarity_search_by_vector(embeddings_vector)
    prompt_template = """
    You are the best in converting the natural language to sql and give sql queries. You can ignore the word 'plot' in the query. The task you should perform here is to give an accurate 
    sql query for the given question the table details are provided in the context so give me the accurate sql query.
    If the user ask question regarding plot and forecast give me the sql query to get the value of the column and the
    timestamp which the user is asking don't give any answer for plotting just need sql query and same for forecast.
    take in consideration that the value in the timestamp column are not arranged properly. Ignore rest of the text in response and provide with SQL query.
    you have to give only the sql query as response and ignore rest of the text. In sql query always have timestamp after 'select'. If needed use 'ONLY' joins and use table name before columns..\n\n
    
    Context:\n {context}?\n
    Question: \n{question}\n 
    Answer: 
    """
    context = docs[0]
    prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"])
    qa_retreival = LLMChain(llm=chat_model,prompt=prompt)
    response = qa_retreival.invoke({"context": context, "question": query})
    query = response["text"]
    query = response['text']
    s = 'select'.upper()
    words = query.split(s)
    query = 'select' + words[1]
    print(query)

    
    if 'join' in query.replace('\n','').split(' ') or 'join'.upper() in query.replace('\n','').split(' '):
        n=1
#         user_question = "Compare and Plot time trend graph for Comp_Stage_1_Flow_217FC7343A, Comp_DGS_DE_Primery_Seal_Vent_Diff_217PDI7162 from 2nd feb to 28th feb"

        print("1")
        table_name = query.split(' ')[5]
        st = query.split()
        given_word = table_name +'.timestamp'
        for i, word in enumerate(st):
            if word == 'timestamp' or word == 'timestamp'.upper() or word == 'timestamp'.capitalize():                                                                                                                                                                                
                st[i] = given_word
                

        query = ' '.join(st)
        
        w = query.split(' ')[5]+'.'+query.split(' ')[1].split(',')[0]
        q = query.replace(query.split(' ')[1].split(',')[0], w,1)
        alert_df1 = pd.read_sql_query(q, con=conn)
        alert_df1.sort_values('Timestamp',inplace=True)
        alert_df1.set_index('Timestamp',inplace=True)
        
#         print("1st column",len(alert_df1[alert_df1.columns[0]].to_list())) #1st column
#         print(alert_df1[alert_df1.columns[0]].to_list()) #1st column
        
        #x1_compare_values------>
        x1_values_compare_plot.append(alert_df1[alert_df1.columns[0]].to_list())
        x11_values_compare_plot.append(alert_df1[alert_df1.columns[1]].to_list())
        y1_values_compare_plot.append(alert_df1.index.to_list())
        
        plt.figure(figsize=(15,5))
        alert_df1[alert_df1.columns[0]].plot(legend=True,color='orange')
        ax2 = plt.twinx()
        alert_df1[alert_df1.columns[1]].plot(legend=True,color='green')
        plt.ylabel('VALUES for timeseries 1')
        ax2.set_ylabel('VALUES for timeseries 2')
    else:
        n=2
        alert_df1 = pd.read_sql_query(query, con=conn)
        # print(len(alert_df1.columns))
        if len(alert_df1.columns) > 2:
            print("2")
#             user_question = "Compare and Plot time trend graph for Comp_Stage_1_Flow_217FC7343A, Comp_Stage_1_Suction_Press_217PI7003 from 2nd feb to 28th feb"
            alert_df1.sort_values('Timestamp',inplace=True)
            alert_df1.set_index('Timestamp',inplace=True)
        
        
            print(alert_df1[alert_df1.columns[0]].to_list()[:100]) #1st column
            print(alert_df1[alert_df1.columns[1]].to_list()[:100]) #second column
            print(alert_df1.index.to_list()[:100]) #y axis(timestamp)
            
            
            
            x2_values_compare_plot.append(alert_df1[alert_df1.columns[0]].to_list())
            x22_values_compare_plot.append(alert_df1[alert_df1.columns[1]].to_list())
            y2_values_compare_plot.append(alert_df1.index.to_list())
            
            
            
            plt.figure(figsize=(15,5))
            alert_df1[alert_df1.columns[0]].plot(legend=True,color='orange')
            ax2 = plt.twinx()
            alert_df1[alert_df1.columns[1]].plot(legend=True,color='green')
            plt.ylabel('VALUES for timeseries 1')
            ax2.set_ylabel('VALUES for timeseries 2')
        
        else:
            n=3
            print("3")
            alert_df1.sort_values('Timestamp',inplace=True)
            alert_df1.set_index('Timestamp',inplace=True)
            
            x_values_s=alert_df1.index.to_list()
            y_values_s=alert_df1[alert_df1.columns[0]].to_list()
            
            
            x_values_plot.append(x_values_s)
            y_values_plot.append(y_values_s)
            
            
            graph_data={
                'x':x_values_plot,
                'y':y_values_plot
            }
            graph_values=graph_data

            
            

#             print(alert_df1[alert_df1.columns[0]].to_list())
#             print(alert_df1.index.to_list())
#             plt.figure(figsize=(15,5))
#             alert_df1[alert_df1.columns[0]].plot(legend=True,color='orange')
            
            
            
            
            
            
            
            
#             #Plot time trend graph for Comp_Stage_1_Flow_217FC7343A?
#             print("3")        
# #             alert_df1.sort_values('Timestamp',inplace=True)
# #             alert_df1.set_index('Timestamp',inplace=True)
#             plt.figure(figsize=(15,5))
#             print("alert_df1",alert_df1)
        
        
        
# #             alert_df1[alert_df1.columns[0]].plot(legend=True,color='orange')
            
# #             print("sample1--->",alert_df1.columns[0])
# #             print("sample2--->",alert_df1[alert_df1.columns[0]])
            
# #             timestamps = alert_df1[alert_df1.columns[0]].index.tolist()
# #             values = alert_df1[alert_df1.columns[0]].tolist()

# #             print("Timestamps: ", timestamps)
# #             print("Values: ", values)
            

            

            
#             column_headers_names = list(alert_df1.columns)
#             column_headers = list(alert_df1.columns.values)
            
            
#             print("column_headers_names",column_headers_names)
#             print("column_headers",column_headers)
            
#             timestamp_Values=alert_df1[column_headers[0]].to_list()
#             y_Values=alert_df1[column_headers[1]].to_list()
            
            
# #             timestamp_Values=alert_df1[column_headers[1]].tolist()
# #             iso_format=[i.isoformat() for i in timestamp_Values]
# #             print("x value without iso converter",timestamp_Values)

                  

#             x_values_plot.append(timestamp_Values)
# #             y_values_plot.append(alert_df1[column_headers[0]].to_list())
#             y_values_plot.append(y_Values)
            
#             print("x values--->",timestamp_Values)
#             print("y values--->",y_Values)
                            
                
#             graph_data={
#                     'x':timestamp_Values,
#                     'y':y_Values
#                 }
#             graph_values=graph_data
            
            
            
#             alert_df = pd.read_sql_query(query, con=conn)
# #                 print("alert",alert_df)
#             column_headers_names = list(alert_df.columns)
#             column_headers = list(alert_df.columns.values)
#             print("column_headers_names",column_headers_names)
#             print("column_headers",column_headers)

#             fig,ax = plt.subplots(figsize=(18,8))

#             timestamp_Values=alert_df[column_headers[1]].tolist()
# #             iso_format=[i.isoformat() for i in timestamp_Values]


#             x_values_plot.append(timestamp_Values)
#             y_values_plot.append(alert_df[column_headers[0]].to_list())

#             graph_data={
#                 'x':x_values_plot,
#                 'y':alert_df[column_headers[0]].to_list()
#             }
# #                 print("graph_data->",graph_data)
#             #trying..................................
#             graph_values=graph_data

    return n
x_feature_values=[]
y_feature_values=[]
base64_encoded_img1=""


def sql_processing(user_question):
    global base64_encoded_img1
    global x_feature_values
    global y_feature_values
    x = 0
    count = 0
 
    # Define your dictionary of questions and queries, removing underscores from keys
    questions = {
        "asset_name_sensorgroup_name": "SELECT sensorgroup_name, asset_name, COUNT(*) AS num_alerts, MAX(start_time) AS start_time FROM alert_table_consolidate WHERE alert_status='closed' GROUP BY sensorgroup_name, asset_name ORDER BY num_alerts DESC, start_time DESC;",
        "assets_sensorgroups": "SELECT sensorgroup_name, asset_name, COUNT(*) AS num_alerts, MAX(start_time) AS start_time FROM alert_table_consolidate WHERE alert_status='closed' GROUP BY sensorgroup_name, asset_name ORDER BY num_alerts DESC, start_time DESC;",
        "device_info_start_time": "SELECT asset_master.asset_name, sensorgroup_master.name, alert_table_consolidate.start_time FROM alert_table_consolidate JOIN asset_master ON alert_table_consolidate.asset_id = asset_master.id JOIN sensorgroup_master ON alert_table_consolidate.sensorgroup_id = sensorgroup_master.sensorgroup_id ORDER BY start_time DESC LIMIT 10",
        "forecast_Comp_IB_Bearing_Shaft_Radial_Vib_X_217VI7113A":"SELECT Comp_IB_Bearing_Shaft_Radial_Vib_X_217VI7113A,Timestamp from _2K1701_CJB_raw ORDER BY Timestamp",
        "forecast_Comp_IB_Bearing_Shaft_Radial_Vib_Y_217VI7113B":"SELECT Comp_IB_Bearing_Shaft_Radial_Vib_Y_217VI7113B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Comp_IB_Journal_Bearing_Temp_B_217TI7115B":"SELECT Comp_IB_Journal_Bearing_Temp_B_217TI7115B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Comp_OB_Bearing_Shaft_Radial_Vib_X_217VI7114A":"SELECT Comp_OB_Bearing_Shaft_Radial_Vib_X_217VI7114A,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Comp_OB_Bearing_Shaft_Radial_Vib_Y_217VI7114B":"SELECT Comp_OB_Bearing_Shaft_Radial_Vib_Y_217VI7114B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Comp_OB_Journal_Bearing_Temp_B_217TI7116B":"SELECT Comp_OB_Journal_Bearing_Temp_B_217TI7116B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Comp_Stage_1_Discharge_Press_217PI7008":"SELECT Comp_Stage_1_Discharge_Press_217PI7008,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Comp_Stage_1_Suction_Press_217PI7003":"SELECT Comp_Stage_1_Suction_Press_217PI7003,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Comp_Turbine_Speed_A_217SC7001A":"SELECT Comp_Turbine_Speed_A_217SC7001A,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Lube_Oil_Press_A_217PI7151A":"SELECT Lube_Oil_Press_A_217PI7151A,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Lube_Oil_Supply_Temp_216TI6103":"SELECT Lube_Oil_Supply_Temp_216TI6103,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "forecast_Compressor_Stage_1_Performance":"SELECT Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_IB_Bearing_Shaft_Radial_Vib_X_217VI7113A":"SELECT Comp_IB_Bearing_Shaft_Radial_Vib_X_217VI7113A,Timestamp from _2K1701_CJB_raw ORDER BY Timestamp",
        "plot_Comp_IB_Bearing_Shaft_Radial_Vib_Y_217VI7113B":"SELECT Comp_IB_Bearing_Shaft_Radial_Vib_Y_217VI7113B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_IB_Journal_Bearing_Temp_B_217TI7115B":"SELECT Comp_IB_Journal_Bearing_Temp_B_217TI7115B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_OB_Bearing_Shaft_Radial_Vib_X_217VI7114A":"SELECT Comp_OB_Bearing_Shaft_Radial_Vib_X_217VI7114A,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_OB_Bearing_Shaft_Radial_Vib_Y_217VI7114B":"SELECT Comp_OB_Bearing_Shaft_Radial_Vib_Y_217VI7114B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_OB_Journal_Bearing_Temp_B_217TI7116B":"SELECT Comp_OB_Journal_Bearing_Temp_B_217TI7116B,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_Stage_1_Discharge_Press_217PI7008":"SELECT Comp_Stage_1_Discharge_Press_217PI7008,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_Stage_1_Suction_Press_217PI7003":"SELECT Comp_Stage_1_Suction_Press_217PI7003,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Comp_Turbine_Speed_A_217SC7001A":"SELECT Comp_Turbine_Speed_A_217SC7001A,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Lube_Oil_Press_A_217PI7151A":"SELECT Lube_Oil_Press_A_217PI7151A,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Lube_Oil_Supply_Temp_216TI6103":"SELECT Lube_Oil_Supply_Temp_216TI6103,Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        "plot_Compressor_Stage_1_Performance":"SELECT Timestamp from _2K1701_CJB_raw_raw ORDER BY Timestamp",
        
    }
    
    # Preprocess the user question by converting it to lowercase and removing punctuation
    processed_question = re.sub(r"[^\w\s]", "", user_question.lower()).strip()
    
    # Split the processed question into words
    processed_question_words = processed_question.split()
    
    # Iterate through the dictionary, removing underscores from keywords and preprocessing
    for keyword, query in questions.items():
        count +=1
        # print("Count.........", count)
        # Preprocess keyword: remove underscores, convert to lowercase, remove punctuation
        processed_keyword = re.sub(r"[^\w\s]", "", re.sub(r"_", " ", keyword.lower())).strip()
    
        # Split the preprocessed keyword into words
        keyword_words = processed_keyword.split()
        
        data_matching=[]

    
        # Check if any keyword in the preprocessed keyword is present in the processed question words
        if all(word in processed_question_words for word in keyword_words):
            # If a match is found, print the query and break the loop
            x=1
            if(count<3):
                curr = conn.cursor()
                curr.execute(query)
                data = curr.fetchall()
                
                #Apis------>
                m=[]  
                print("data",data)
                for item in data:
                    print("item",item)
#                     modified_item = (*item[:-1], item[-1].isoformat())
                    m.append(item)
#                 print(m)
#                 print("data--->",data)
                
                first_data_length=len(data[0])
                
                
                table_data=dict(zip([str(i) for i in range(first_data_length)],m))
                base64_encoded_img1=str(table_data)
                
                
                
#                 list asset name and sensorgroup name are in alert status?
                for row in data:
                    data_matching.append(row)
                    print(row)
                    print("\n")
                
                
            # elif(count<15):
            #     print(count)
            #     print("inside elif")
            #     df = pd.read_sql_query(query, con=conn)
            #     print(df)
            #     column_headers = list(df.columns.values)
            #     print(column_headers)

            #     fig,ax = plt.subplots(figsize=(18,8))

            #     df.plot(kind='line', x=column_headers[1], y=column_headers[0], color='black', ax=ax)

            #     # set the title
            #     plt.title('LinePlots')
        
            #     # show the plot
            #     plt.show()
            else:
                x=2
                # print(count)
                # print("inside if")
                alert_df1 = pd.read_sql_query(query, con=conn)
                print("<-----------Forecasting-------------->")
                
#                 df = alert_df
                column_headers = list(alert_df1.columns.values)
                first_column = column_headers[0]
                second_column = column_headers[1]
                
                
                last_timestamp = alert_df1[second_column].iloc[-1]
                model_fi1=ARIMA(alert_df1[first_column],order=(1,1,1))
                model_fi1=model_fi1.fit()
                
                
                last_30d_df = alert_df1.tail(2977)
                start=len(alert_df1)
                end=len(alert_df1)-1+192+96
                pred=model_fi1.predict(start=start,end=end,typ='levels').rename('ARIMA Predictions')

                forecast_Column = first_column+'_forecast'
                forecast_range1=pd.date_range(start=last_timestamp, periods=288,freq='15T')
                new_data = {second_column: forecast_range1,forecast_Column: pred}
                new_df = pd.DataFrame(new_data)
                
                print("-------***--------")
                print(last_30d_df)
                
                
                
#                 concatenated_df = pd.concat([last_30d_df, new_df], ignore_index=True)

#                 concatenated_df.set_index('Timestamp',inplace=True)

                plt.figure(figsize=(15,5))
#                 concatenated_df[first_column].plot(color='blue',label=first_column)
#                 concatenated_df[forecast_Column].plot(color='orange',label=forecast_Column)
            
                last_30d_df[first_column].plot(color='blue',label=first_column)
                
                new_df[forecast_Column].plot(color='orange',label=forecast_Column)
                
                
                
                #Apis data------>
#                 print("last_30d_df[timestamp]",last_30d_df["Timestamp"].tolist())
#                 print("new df",new_df["Timestamp"].tolist())
                
#                 iso_format=[i.isoformat() for i in last_30d_df["Timestamp"].tolist()]



                without_iso_format=last_30d_df["Timestamp"].tolist()
                iso_format2=[i.isoformat() for i in new_df["Timestamp"].tolist()]
        
            
                final_x_timestamps=[]
                x_values_s=without_iso_format+iso_format2
                final_x_timestamps.append(x_values_s)
                
                
                final_y_values=[]
                y_values_s=last_30d_df["Comp_IB_Bearing_Shaft_Radial_Vib_X_217VI7113A"].tolist()+new_df[forecast_Column].tolist()
                final_y_values.append(y_values_s)
            


                print("length of final_x_timestamps----> ",len(final_x_timestamps[0]))
                print("length of final_y_values----> ",len(final_y_values[0]))

                x_feature_values.append(final_x_timestamps[0])
                y_feature_values.append(final_y_values[0])
                
                plt.legend()
                plt.show()

    return x
def query_agent(query):
    prompt = (
        """
            For the following query, if it requires to query a sql table or if the following query askes to plot or forecast the
            user is asking to fetch a sql table so, reply as follows:
            SQL: <sql_query>;
            example:
            SQL: SELECT * FROM employees;
            SQL: SELECT name, salary FROM employees WHERE em_id = 1;
            SQL: SELECT COUNT(*) FROM "Employee";
            SQL: SELECT * FROM Customer WHERE Country = 'Canada';
            If you do not know the answer or if it doesn't passes the first condition of SQL, reply as follows:
            PDF: search in pdf.
            """
        + query
    )
    response = chat_model.invoke(prompt)
    #print(response)
    return response
 
# # user_question = "Plot time trend graph for Comp_Stage_1_Flow_217FC7343A?"
# user_question = "Compare and Plot time trend graph for Comp_Stage_1_Flow_217FC7343A, Comp_DGS_DE_Primery_Seal_Vent_Diff_217PDI7162 from 2nd feb to 28th feb"
# # user_question = "Compare and Plot time trend graph for Comp_Stage_1_Flow_217FC7343A, Comp_Stage_1_Suction_Press_217PI7003 from 2nd feb to 28th feb"
# # user_question = " list asset name and sensorgroup name are in alert status?"
# # user_question = "Forecast the time trend graph for Comp IB Bearing Shaft Radial Vib X 217VI7113A?"
# x=sql_processing(user_question)


# #x==0
# # user_question = "Plot time trend graph for Comp_Stage_1_Flow_217FC7343A?"n=3
# # user_question = "Compare and Plot time trend graph for Comp_Stage_1_Flow_217FC7343A, Comp_DGS_DE_Primery_Seal_Vent_Diff_217PDI7162 from 2nd feb to 28th feb"n=1
# # user_question = "Compare and Plot time trend graph for Comp_Stage_1_Flow_217FC7343A, Comp_Stage_1_Suction_Press_217PI7003 from 2nd feb to 28th feb"n=2


# # x==1
# # user_question = " list asset name and sensorgroup name are in alert status?"x=1


# #x==2
# # user_question = "Forecast the time trend graph for Comp IB Bearing Shaft Radial Vib X 217VI7113A?"



# print("x values--->",x)
# if x==0:
#     question_source = query_agent(user_question)
 
#     pattern ='SQL'
#     match = re.search(pattern, str(question_source), re.IGNORECASE)
#     if match:
#         n=get_sql_query_from_excel(user_question)
#         print("n values",n)
#     else:   
#         print(get_answer_from_pdf(user_question))
# user_question = "Take the last mont data of Comp_Stage_1_Flow_217FC7343A and forecast ?"
# RAGAS
# from trulens_eval import Tru
# from trulens_eval.tru_custom_app import instrument
# tru = Tru()

# from langchain_google_genai import GoogleGenerativeAI 

# #oai_client = GoogleGenerativeAI()

# class RAG_from_scratch:
#     @instrument
#     def retrieve(self, query: str) -> list:
#         """
#         Retrieve relevant text from vector store.
#         """
#         retrieved_docs = retriever.get_relevant_documents(query)
        
#         return retrieved_docs[0].page_content
#     @instrument
#     def generate_completion(self, query: str, context_str: list) -> str:
#         """
#         Generate answer from context.
#         completion = oai_client.(
#         model="gemini-pro",
#         temperature=0,
#         messages=
#         [
#             {"role": "user",
#             "content": 
#             f"We have provided context information below. \n"
#             f"---------------------\n"
#             f"{context_str}"
#             f"\n---------------------\n"
#             f"Given this information, please answer the question: {query}"
#             }
#         ]
#         ).choices[0].message.content""" 
        
#         prompt_template = """
#         Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
#         provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
#         Context:\n {context}?\n
#         Question: \n{question}\n 
#         Answer: 
#         """
#         prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"]) 
#         qa_retreival = LLMChain(llm=chat_model,prompt=prompt)
#         completion = qa_retreival.invoke({"context": context_str, "question": query})
#         print(completion["text"])
#         return completion

#     @instrument
#     def query(self, query: str) -> str:
#         context_str = self.retrieve(query)
#         completion = self.generate_completion(query, context_str)
#         return completion

# rag = RAG_from_scratch()
# from trulens_eval import Feedback, Select
# from trulens_eval.feedback.provider.langchain import Langchain
# import numpy as np

# provider = Langchain(chain=model)
# # Define a groundedness feedback function
# f_groundedness = (
#     Feedback(provider.groundedness_measure_with_cot_reasons, name = "Groundedness")
#     .on(Select.RecordCalls.retrieve.rets.collect())
#     .on_output()
# )
# # Question/answer relevance between overall question and answer.
# f_answer_relevance = (
#     Feedback(provider.relevance_with_cot_reasons, name = "Answer Relevance")
#     .on(Select.RecordCalls.retrieve.args.query)
#     .on_output()
# )

# # Context relevance between question and each context chunk.
# f_context_relevance = (
#     Feedback(provider.context_relevance_with_cot_reasons, name = "Context Relevance")
#     .on(Select.RecordCalls.retrieve.args.query)
#     .on(Select.RecordCalls.retrieve.rets)
#     .aggregate(np.mean) # choose a different aggregation method if you wish
# )
# from trulens_eval import TruCustomApp
# tru_rag = TruCustomApp(rag,
#     app_id = 'RAG v1',
#     feedbacks = [f_groundedness, f_answer_relevance, f_context_relevance])
# with tru_rag as recording:
#     rag.query("what are the correct actions for Centrifugal Compressor Continual Surge?")
# tru.get_leaderboard(app_ids=["RAG v1"])
# copiolt
from flask import Flask,request,jsonify
from flask_cors import CORS
import json
from io import BytesIO
import base64
import os
import ast
from datetime import datetime
# import statistics
current_time = datetime.now().strftime("%I:%M %p")
# from bs4 import BeautifulSoup


app = Flask(__name__)
CORS(app)

@app.route('/')
def Home():
    return "Apis Runnning"

@app.route('/home')
def Homes():
    return "Home"


@app.route('/receive_data_final_final_video', methods=['POST'])
def receive_data():
    try:
        if request.method == 'POST':
            received_data = request.json  # Get the JSON data sent from frontend
            print("received_data----->", received_data)
            print(" ")
            
            
            
            user_question=received_data["message"]
            
            
            print("user input----->", user_question)

            x=sql_processing(user_question)
            print("x value--->",x)   
            
            
             
            

            if x==2:
                print("x feature selection-------->",len(x_feature_values[0]),"---->",x_feature_values[0])
                print("y feature selection-------->",len(y_feature_values[0]),"---->",y_feature_values[0])
   
                received_data.update({'role': 'assistant', 'image':  base64_encoded_img1,
                                      'x_values_feature':x_feature_values[0],
                                      'y_values_feature':y_feature_values[0],
                                      'sentTime':current_time})

                
                

            
#             if x==1 and base64_encoded_img1[0]!="{" :
#                 z_values=[]
#                 for i in y_values[0]:
#                     if str(i).strip()=="nan":
#                         z_values.append('0')
#                     else:
#                         z_values.append(i)



#                 y_values_graphs=list(map(float,z_values))
#                 received_data.update({'role': 'assistant', 'image':  base64_encoded_img1,'x_values':x_values[0],'y_values':y_values_graphs,'sentTime':current_time})



   
            if x==1 and base64_encoded_img1[0]=="{" :
                received_data.update({'role': 'assistant', 'table_content':  ast.literal_eval(base64_encoded_img1),'sentTime':current_time})
                
                
                
                
            if x==0:
                question_source = query_agent(user_question)
                pattern ='SQL'
                match = re.search(pattern, str(question_source), re.IGNORECASE)
                
                if match:
                    n=get_sql_query_from_excel(user_question)
                    
                    
                    if n==1:
                        z1_compare_plots=[]
                        for i in x1_values_compare_plot[0]:
                            if str(i).strip()=="nan":
                                z1_compare_plots.append('0')
                            else:
                                z1_compare_plots.append(i)
                        x1_compare_value_plot_final=list(map(float,z1_compare_plots))
                        
                        
                        z2_compare_plots=[]
                        
                        for i in x11_values_compare_plot[0]:
#                             print("i------->",i)
                            if str(i).strip()=="nan":
                                z2_compare_plots.append('0')
                            else:
                                z2_compare_plots.append(i)
                                
                        x11_compare_value_plot_final=list(map(float,z2_compare_plots))  
                        compare_graph1="compare_graphs"
                        
#                         print("x1_values_comp1",x1_compare_value_plot_final)
#                         print("x2_values_comp1",x11_compare_value_plot_final)
#                         print("y1_values_comp1",y1_values_compare_plot[0])

                        
                        
                        received_data.update({'role': 'assistant','compare_graph1':compare_graph1,
                                              'x1_values_comp1':x1_compare_value_plot_final,
                                              'x2_values_comp2':x11_compare_value_plot_final,
                                              'y1_values_comp':y1_values_compare_plot[0],
                                              
                                              'sentTime':current_time})
                        
                        
                        
                    if n==2:
                        


                        zz1_compare_plots=[]
                        for i in x2_values_compare_plot[0]:
                            if str(i).strip()=="nan":
                                zz1_compare_plots.append('0')
                            else:
                                zz1_compare_plots.append(i)
                        xx1_compare_value_plot_final=list(map(float,zz1_compare_plots))
                        
                        
                        zz2_compare_plots=[]
                        
                        for i in x22_values_compare_plot[0]:
#                             print("i------->",i)
                            if str(i).strip()=="nan":
                                zz2_compare_plots.append('0')
                            else:
                                zz2_compare_plots.append(i)
                                
                        xx11_compare_value_plot_final=list(map(float,zz2_compare_plots))  
                        compare_graph2="compare_graphs"
                        


                        
                        
                        received_data.update({'role': 'assistant','compare_graph2':compare_graph2,
                                              'xx1_values_comp1':xx1_compare_value_plot_final,
                                              'xx2_values_comp1':xx11_compare_value_plot_final,
                                              'y2_values_comp1':y2_values_compare_plot[0],
                                              'sentTime':current_time})
                        
                        
                    
                    if n==3:
                        print("n values",n)
                        z_values=[]
                        print("y values",y_values_plot)
                        for i in y_values_plot[0]:
                            if str(i).strip()=="nan":
                                z_values.append('0')
                            else:
                                z_values.append(i)



                        y_values_graphs=list(map(float,z_values))
                        received_data.update({'role': 'assistant', 'image':  base64_encoded_img1,'x_values':x_values_plot[0],'y_values':y_values_graphs,'sentTime':current_time})
                else:   
                    agent_output2=get_answer_from_pdf(user_question)
                    
                    
                    
#                     #sample
#                     document=retriever.get_relevant_documents(user_question)
#                     for doc in document:
#                         agent_output2=agent_output2+"\n"+"("+doc.metadata["source"]+")"
#                     #sample         
                        
                    received_data.update({'role': 'assistant', 'x': agent_output2,'pdfpath':"C:/Users/40019115/geminiAPI/Centrifugal Air Compressor Troubleshooting Guide 2.pdf",'sentTime':current_time})
            return jsonify(received_data)
           
            
        
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Error processing data"}), 500
if __name__ == '__main__':
    app.run(threaded=False,debug=True)
    # app.run(host='127.0.0.1', port=9004, debug=False,threaded=False)

    















