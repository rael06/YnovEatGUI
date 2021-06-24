import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  baseUrl = 'http://89.38.150.41:91';

  // Authentication
  loginUrl = `${this.baseUrl}/api/Authentication/login`;
  registerCustomer = `${this.baseUrl}/api/Authentication/register-customer`;
  registerRestaurantAdmin = `${this.baseUrl}/api/Authentication/register-restaurantOwner`;
  getRestaurantInfo = `${this.baseUrl}/api/Restaurant/get-mine`;

  // Restaurant Info
  createRestaurant = `${this.baseUrl}/api/Restaurant/create`;
  updateRestaurantInfo = `${this.baseUrl}/api/Restaurant/update`;

  // Restaurant Products
  getAllRestaurantProducts = `${this.baseUrl}/api/RestaurantProduct/get-all`;
  restaurantProduct = `${this.baseUrl}/api/RestaurantProduct`;

  // Restaurant Orders
  getNewOrders = `${this.baseUrl}/api/Order/get-new-orders-ids`;
  addStatusToOrders = `${this.baseUrl}/api/Order/add-status-to-orders`;

  // CUSTOMER
  getRestaurantProducts = `${this.baseUrl}/api/customerProduct/get-all`;
  getAllRestaurants = `${this.baseUrl}/api/customer/get-all-restaurants`;
  createOrder = `${this.baseUrl}/api/Order/create`;

  
}
