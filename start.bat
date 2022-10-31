@echo off
title Vanity Sniper

if exist node_modules\ (
  node index
  pause
) else (
  call npm i >> NUL
  node index
  pause
)