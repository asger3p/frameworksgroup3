import fs from 'fs';   // read/write files
import path from "path";

export default class CustomerModel {
    constructor() {
        this.dbPath = path.join(process.cwd(), "DB/database.json");  // save path to data.json
    }

    // GET all customers
    getAllCustomers() {
        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
        return db.customers;
    }

    // GET specific customer by ID
    getCustomerById(customerId) {
        if (!customerId) {
            throw new Error("Missing required fields or invalid format");
        }

        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
        const customer = db.customers.find(c => c.customer_id === customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
        return customer;
    }

    // CREATE new customer
    createCustomer(customerData) {
        const { name, email, password } = customerData; // required fields

        if (!name || !email || !password) {
            throw new Error("Missing required fields");
        }

        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
        const newCustomerId = `customer_${db.customers.length + 1}`;   // generate new customer ID
        const newCustomer = { customer_id: newCustomerId, ...customerData };
        db.customers.push(newCustomer);
        
        //Create an empty basket for the customer
        if (!db.baskets) {
            db.baskets = [];
        }
        const newBasket = {
            customerId: newCustomerId,
            items: []
        };
        db.baskets.push(newBasket);
    
        fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
        return newCustomer;

        
    }

    // UPDATE customer details
    updateCustomer(customerId, updatedData) {
        if (!customerId) {
            throw new Error("Missing required fields or invalid format");
        }

        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8")); 
        const customerIndex = db.customers.findIndex(c => c.customer_id === customerId);

        if (customerIndex === -1) {
            throw new Error("Customer not found");
        }
        
        db.customers[customerIndex] = { ...db.customers[customerIndex], ...updatedData };
        fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
        return db.customers[customerIndex];
    }

    // DELETE customer
    deleteCustomer(customerId) {
        if (!customerId) {
            throw new Error("Missing required fields or invalid format");
        }

        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8")); 
        const customerIndex = db.customers.findIndex(c => c.customer_id === customerId);

        if (customerIndex === -1) {
            throw new Error("Customer not found");
        }

        const deletedCustomer = db.customers.splice(customerIndex, 1)[0];
        fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2));
        return deletedCustomer;
    }
}
