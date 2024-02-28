from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

DATABASE_URL = "..."

conn = psycopg2.connect(DATABASE_URL, sslmode="require")

app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/createtable")
async def create_table():
    cur = conn.cursor()
    create_table_query = """
    CREATE TABLE emp (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        emp_id INTEGER,
        salary FLOAT,
        address VARCHAR(200),
        mobile_number VARCHAR(20)
    )
    """
    cur.execute(create_table_query)
    conn.commit()
    return {"message": "Created Table Successfully"}


# Add New Employee
@app.post("/add")
async def add_employee(
    name: str, emp_id: int, salary: float, address: str, mobile_number: str
):
    cur = conn.cursor()
    insert_query = """
    INSERT INTO emp (name, emp_id, salary, address, mobile_number) VALUES (%s, %s, %s, %s, %s)
    """
    cur.execute(insert_query, (name, emp_id, salary, address, mobile_number))
    conn.commit()
    return {"message": "Employee Added Successfully"}


# Get All Employees
@app.get("/getall")
async def get_all_employees():
    cur = conn.cursor()
    cur.execute("SELECT * FROM emp")
    rows = cur.fetchall()
    return {"employees": rows}


# Update Employee
@app.put("/update/{id}")
async def update_employee(
    id: int, name: str, emp_id: int, salary: float, address: str, mobile_number: str
):
    cur = conn.cursor()
    update_query = """
    UPDATE emp SET name = %s, emp_id = %s, salary = %s, address = %s, mobile_number = %s WHERE id = %s
    """
    cur.execute(update_query, (name, emp_id, salary, address, mobile_number, id))
    conn.commit()
    return {"message": "Employee Updated Successfully"}


# Delete Employee
@app.delete("/delete/{id}")
async def delete_employee(id: int):
    cur = conn.cursor()
    delete_query = "DELETE FROM emp WHERE id = %s"
    cur.execute(delete_query, (id,))
    conn.commit()
    return {"message": "Employee Deleted Successfully"}
