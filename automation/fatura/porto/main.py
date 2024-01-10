import random
from sys import displayhook
import pandas as pd


df = pd.read_excel("Fatura.xlsx") #importando arquivo
#df = df.drop(1, axis=0) # remove a segunda linha
df.columns.values[0] = "data" # insere o cabeçalho "Data" na primeira coluna
df.columns.values[1] = "empresa" # insere o cabeçalho "Empresa" na segunda coluna
df.columns.values[3] = 'debito'


df = df.drop(df.columns[2], axis=1) # remove a coluna de credito
df = df.drop(df.columns[3], axis=1)# remove a coluna de Cartão

df = df.dropna(subset=[df.columns[2]]) # remove as linhas que n'ao possuem valor de credito


displayhook(df)

df['tipo'] = None
df['parcelado'] = None
df['parcela_atual'] = None
df['parcelas'] = None
df['ultima_parcela'] = None

# inserindo id da importacao
import uuid
guid = uuid.uuid4 ()

df['fatura_id'] = str(guid)


# # Crie uma máscara booleana para identificar as linhas onde a segunda coluna tem o padrão "99/99"
# mascara = df[df.columns[1]].str.contains(r'\d+/\d+', na=False)

# # Atualize a coluna 'parcelado' com True nas linhas correspondentes à máscara
# df.loc[mascara, 'parcelado'] = True

df['parcelado'] = df[df.columns[1]].str.contains(r'\d+/\d+')

def extrair_ultimos_dois_caracteres(valor):
    if pd.notna(valor):
        return str(valor)[-2:]
    return None

df = df.loc[df[df.columns[0]] != 'TOTAL'] # Remova as linhas onde o valor da primeira coluna é 'TOTAL'
#df['parcela_atual'] = df[df.columns[1]].str.extract(r'(\d+)/(?=\d+)')#.astype(str).str[-2:]

df['parcela_atual'] = df[df.columns[1]].str.extract(r'(?P<numeral>\d+)/(?=\d+)')
df['parcela_atual'] = df['parcela_atual'].astype(str).str[-2:]
df['parcela_atual'] = df['parcela_atual'].replace('an', None)

df['parcelas'] = df[df.columns[1]].str.extract(r'/(?P<numeral>\d+)')
df['parcelas'] = df['parcelas'].astype(str).str[-2:]
df['parcelas'] = df['parcelas'].replace('an', None)

def is_last_parcel(row):

    return True if (row['parcelas'] == row['parcela_atual']) and row['parcelas'] != None and row['parcela_atual']!=None else  None

df['ultima_parcela'] = df.apply(is_last_parcel, axis=1)

# Converter a coluna de datas para o tipo datetime
df['data'] = pd.to_datetime(df['data'], format='%d/%m')

# Adicionar o ano
ano_desejado = 2023
df['data'] = df['data'].apply(lambda x: x.replace(year=ano_desejado))


# Defina listas de palavras-chave para cada tipo
farmacia = ['droga', 'farmacia','farmaazul']
alimentacao = ['supermercado', 'mercado', 'atacadao','padaria','atacadista','savegnago','batatas','bubble','enxuto']
transporte = ['seguros','autoposto','irmaosloureiro']

def atribuir_tipo(row):
    for palavra in farmacia:
        if palavra in str(row[df.columns[1]]).lower():
            return 'farmacia'
    for palavra in alimentacao:
        if palavra in str(row[df.columns[1]]).lower():
            return 'alimentacao'
    for palavra in transporte:
        if palavra in str(row[df.columns[1]]).lower():
            return 'transporte'
    return  None

# Ordenar o DataFrame pela coluna "parcelado"
df = df.sort_values(by='parcelado',ascending=True)

df['tipo'] = df.apply(atribuir_tipo, axis=1)

import mysql.connector as sql
from sqlalchemy import create_engine


host='localhost',
user='root',
password='123456789',
database='import_invoice'


# Importar o sqlalchemy e criar o engine
import sqlalchemy as sql
# engine = sql.create_engine('mysql+mysqlconnector://'+'user'+':'+'password'+'@'+'host'+':'+'port'+'/'+'database')



# Criar a conexão com o banco de dados mysql
# db_connection = sql.connect(host='localhost', database=database, user='root', password='123456789')

# Criar o engine usando o sqlalchemy
db_data = 'mysql+mysqlconnector://' + 'root' + ':' + '123456789' + '@' + 'localhost' + ':3306/' + database
engine = create_engine(db_data)


# Importar a classe declarative_base e criar as subclasses
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


displayhook(df)


# Usar o método to_sql do dataframe
# df.to_sql(name='invoice', con=engine, if_exists='append', index=False)

number_file = ''.join([str(random.randint(0, 9)) for _ in range(10)])
df.to_excel(f"fatura_{number_file}.xlsx", index=True)
displayhook(df)

# Calcule a soma total de debito
soma_total = df[df.columns[2]].sum()
# Exiba a soma total
print("\nSoma Total da Terceira Coluna:", soma_total)

