# Edible Wild Plant Identification Mobile App

## Overview

This project aims to develop a mobile application that identifies edible wild plants using deep learning and computer vision. The app is built on the MobileNetV2 architecture and can classify 35 different edible wild plant species. It integrates a deep learning model with a user-friendly mobile interface, enabling users to easily identify plants and access detailed information about them.

## Features

- **Home Screen:** Allows users to upload images from their gallery or take new photos with their camera. Images are sent to the Flask API for identification.
- **Result Screen:** Shows the predicted plant species along with detailed information and a slideshow of images. Users can add plants to their favorites.
- **Favorites:** Displays a list of saved plants with plant names and images.
- **History:** Lists all previously scanned plants with plant names, images, and dates added. 
- **Plants:** Provides a comprehensive list of all plants the app can identify.
- **About:** Contains information about the project and developer, including a link to the GitHub repository and the current app version.

<img src="preview/preview1.gif" width="300">

## Model Architecture

The deep learning model is based on MobileNetV2, known for its efficiency and effectiveness in mobile and embedded vision applications. This architecture allows for accurate plant identification while maintaining a lightweight model suitable for mobile devices.

## Backend Repository

The backend Flask API repository handles image processing and plant identification. You can find the backend repository [here](https://github.com/MohamadHajjRabee/edibleEats-backend).

## Dataset

The model is trained on a dataset comprising 16,500 images of edible wild plants. Data augmentation techniques were used to enhance the dataset's diversity and improve model performance.

Dataset link: [Kaggle.com](https://www.kaggle.com/datasets/ryanpartridge01/wild-edible-plants)
