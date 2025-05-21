import CustomerModel from "../model/customerModel.js";
import basketModel from '../model/basketModel.js';
const basketModelInstance = new basketModel();
const model = new CustomerModel();


// POST (create) a new customer (/customers)
export async function createCustomer(req, res) {
  try {
    const newCustomer = await model.createCustomer(req.body);

    // Create an empty basket for the new customer
    await basketModelInstance.createEmptyBasket(newCustomer.customer_id);

    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    res.status(400).json({ error: `Invalid customer data: ${error.message}` });
  }
}


// GET all customers (/customers)
export async function getAllCustomers(req, res){
    try{
        const customers = await model.getAllCustomers();
        res.status(200).json(customers);
    } catch (error){
        res.status(500).json({ error: `Failed to retrieve customers: ${error.message}` });
    }
}


// GET a specific customer by ID (/customers/id)
export async function getCustomerById(req, res) {
    const customerId = req.params.id;
    try {
      const customer = await model.getCustomerById(customerId);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {   // if something goes wrong, respond with a 500 internal server error
      res.status(500).json({ error: `Failed to retrieve customer: ${error.message}` });
    }
  }


// PUT (update) a specific customer
export async function updateCustomer(req, res) {
    const customerId = req.params.id;
    try {
      const updatedCustomer = await model.updateCustomer(customerId, req.body); 
      if (updatedCustomer) {
        res.status(200).json({ message: 'Customer updated successfully' });
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {   // if something goes wrong, respond with a 500 internal server error
      res.status(500).json({ error: `Failed to update customer: ${error.message}` });
    }
  }


// DELETE a specific customer
export async function deleteCustomer(req, res){
    const customerId = req.params.id;
    try {
      const deletedCustomer = await model.deleteCustomer(customerId);
      if (deletedCustomer) {
        res.status(200).json({ message: 'Customer deleted successfully' });
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) { // if something goes wrong, respond with a 500 internal server error
      res.status(500).json({ error: `Failed to delete customer: ${error.message}` });
    }
  }

