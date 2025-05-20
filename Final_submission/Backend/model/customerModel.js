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
        const { name, mail, password } = customerData; // required fields

        if (!name || !mail || !password) { // Ensure name, mail, and password are provided
            throw new Error("Missing required fields");
        }

        const db = JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));

        // generate new customer ID by finding the highest existing id number
        const max = db.customers
        .map(c => +c.customer_id.replace('customer_', '')) // extract numeric part of IDs
        .reduce((a, b) => Math.max(a, b), 0); // take the maximum
        const newCustomerId = `customer_${max + 1}`; // generating next ID
        const newCustomer = { customer_id: newCustomerId, name, mail, password, };
        db.customers.push(newCustomer);
        
        //Create an empty basket for the customer
        if (!db.baskets) {
            db.baskets = [];
          }
        
          db.baskets.push({
            customer_id: newCustomerId,
            items: []
          });
        
    
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
