import React from "react";
import { Appwrite } from "appwrite";

const sdk = new Appwrite();

sdk
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("6258075cae6d09afd03a"); // Your project ID

export const account = sdk.account;
export const storage = sdk.storage;
