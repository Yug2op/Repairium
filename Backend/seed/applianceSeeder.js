import mongoose from "mongoose";
import dotenv from "dotenv";
import Appliance from "../models/Appliance.js"; // adjust path if needed

dotenv.config();

const adminId = new mongoose.Types.ObjectId("69d38c4d692cfc087136cc78");

export const appliances  = [

  {
    name: "Voltas 1 Ton Window AC",
    category: "large",
    subCategory: "air_conditioner",
    brand: "Voltas",
    model: "123V DZA",
    description: "1 Ton Window AC",
    basePrice: 1400,
    serviceCharge: 350,
    emergencyCharge: 450,
    estimatedServiceTime: 90,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Water leakage",
      solution: "Drain cleaning",
      estimatedCost: 600,
      estimatedTime: 45
    }],
    requiredSkills: ["AC Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Blue Star Split AC 1.5 Ton",
    category: "large",
    subCategory: "air_conditioner",
    brand: "Blue Star",
    model: "IC518DBTU",
    description: "Inverter Split AC",
    basePrice: 2100,
    serviceCharge: 500,
    emergencyCharge: 600,
    estimatedServiceTime: 120,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "No cooling",
      solution: "Gas refill",
      estimatedCost: 1600,
      estimatedTime: 60
    }],
    requiredSkills: ["AC Repair", "AC Installation"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "LG Top Load Washing Machine",
    category: "large",
    subCategory: "washing_machine",
    brand: "LG",
    model: "T65SKSF4Z",
    description: "6.5kg Top Load",
    basePrice: 700,
    serviceCharge: 250,
    emergencyCharge: 350,
    estimatedServiceTime: 60,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Water not draining",
      solution: "Drain pump repair",
      estimatedCost: 700,
      estimatedTime: 40
    }],
    requiredSkills: ["Washing Machine Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Bosch Front Load Washing Machine",
    category: "large",
    subCategory: "washing_machine",
    brand: "Bosch",
    model: "WAJ2426SIN",
    description: "7kg Front Load",
    basePrice: 900,
    serviceCharge: 300,
    emergencyCharge: 400,
    estimatedServiceTime: 70,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Noise during spin",
      solution: "Bearing replacement",
      estimatedCost: 1200,
      estimatedTime: 60
    }],
    requiredSkills: ["Washing Machine Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Haier Double Door Refrigerator",
    category: "large",
    subCategory: "refrigerator",
    brand: "Haier",
    model: "HRF-2784BS",
    description: "278L Double Door",
    basePrice: 1100,
    serviceCharge: 350,
    emergencyCharge: 450,
    estimatedServiceTime: 60,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Compressor issue",
      solution: "Compressor repair",
      estimatedCost: 2000,
      estimatedTime: 90
    }],
    requiredSkills: ["Refrigerator Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Croma Microwave Oven",
    category: "small",
    subCategory: "microwave",
    brand: "Croma",
    model: "CRAM20",
    description: "20L Microwave Oven",
    basePrice: 400,
    serviceCharge: 150,
    emergencyCharge: 250,
    estimatedServiceTime: 40,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Buttons not working",
      solution: "Control panel repair",
      estimatedCost: 500,
      estimatedTime: 30
    }],
    requiredSkills: ["Microwave Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Orient Ceiling Fan",
    category: "small",
    subCategory: "fan",
    brand: "Orient",
    model: "Aeroquiet",
    description: "Silent Ceiling Fan",
    basePrice: 250,
    serviceCharge: 120,
    emergencyCharge: 180,
    estimatedServiceTime: 25,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Slow speed",
      solution: "Capacitor replacement",
      estimatedCost: 150,
      estimatedTime: 20
    }],
    requiredSkills: ["Electrical Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Prestige Induction Cooktop",
    category: "small",
    subCategory: "induction",
    brand: "Prestige",
    model: "PIC 20",
    description: "Induction Cooktop",
    basePrice: 350,
    serviceCharge: 150,
    emergencyCharge: 200,
    estimatedServiceTime: 30,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Not heating",
      solution: "Coil repair",
      estimatedCost: 600,
      estimatedTime: 30
    }],
    requiredSkills: ["Appliance Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Mi Smart LED TV",
    category: "small",
    subCategory: "television",
    brand: "Mi",
    model: "L32M6",
    description: "32 inch Smart TV",
    basePrice: 600,
    serviceCharge: 250,
    emergencyCharge: 350,
    estimatedServiceTime: 60,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "No sound",
      solution: "Speaker repair",
      estimatedCost: 700,
      estimatedTime: 40
    }],
    requiredSkills: ["TV Repair"],
    isActive: true,
    addedBy: adminId
  },

  {
    name: "Racold Electric Geyser",
    category: "small",
    subCategory: "geyser",
    brand: "Racold",
    model: "Pronto Neo",
    description: "Instant Water Heater",
    basePrice: 550,
    serviceCharge: 200,
    emergencyCharge: 300,
    estimatedServiceTime: 50,
    warrantyPeriod: 0,
    images: [],
    commonIssues: [{
      issue: "Water not heating",
      solution: "Thermostat replacement",
      estimatedCost: 700,
      estimatedTime: 40
    }],
    requiredSkills: ["Geyser Repair"],
    isActive: true,
    addedBy: adminId
  }

];

const seedData = async () => {
  try {
    // connect DB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // insert new data
    await Appliance.insertMany(appliances);
    console.log("Appliances inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();