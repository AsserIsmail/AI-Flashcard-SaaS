'use client';
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { db } from "@/firebase";
import { Container, Paper, TextField, Typography, Box, Button, Grid, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, CircularProgress, Link, AppBar, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore";