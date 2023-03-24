import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Navigate, useParams } from "react-router-dom";
import { getAllCategories } from "./helper/adminapicalls";

