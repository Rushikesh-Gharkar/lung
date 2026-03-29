🧠 Explainable Med — Phase-Wise Implementation Plan

Project: Explainable Medical AI Diagnostic Platform
Goal: Predict diseases from medical images and explain predictions using AI explainability (Grad-CAM)

Tech Stack

Layer	Technology
Frontend	HTML + CSS + JS (or React if time)
Backend	FastAPI
ML	TensorFlow / Keras
Explainability	Grad-CAM
Data	Kaggle medical datasets
Deployment	Render / Railway / Vercel
📋 Table of Contents

1️⃣ Prerequisites & Setup
2️⃣ Repository & Project Structure
3️⃣ Dataset Collection & Preparation
4️⃣ Model Training
5️⃣ Model Export & Versioning
6️⃣ Backend API Development
7️⃣ Explainability Engine (GradCAM)
8️⃣ Frontend UI
9️⃣ Model–Backend Integration
10️⃣ Multi-Disease Support
11️⃣ Visualization & Medical Insights
12️⃣ Testing & Evaluation
13️⃣ Deployment
14️⃣ Demo Preparation

Phase 0 — Prerequisites & Environment Setup

Goal: Install required tools.

Estimated Time: 30–60 minutes

Install Python
python --version

Use Python 3.10+

Install Required Libraries
pip install tensorflow
pip install fastapi uvicorn
pip install numpy pandas
pip install pillow
pip install matplotlib
pip install opencv-python
pip install scikit-learn

Optional:

pip install grad-cam
Install Node (for frontend)
node -v
npm -v
Create Virtual Environment
python -m venv venv

Activate

Mac/Linux

source venv/bin/activate

Windows

venv\Scripts\activate
Phase 1 — Repository & Project Structure

Estimated Time: 30 minutes

Create Git repo.

git init
Folder Structure
ExplainableMed
│
├── backend
│   ├── main.py
│   ├── model_loader.py
│   ├── prediction.py
│   ├── gradcam.py
│   └── utils.py
│
├── models
│   ├── skin_model.h5
│   └── lung_model.h5
│
├── datasets
│   ├── skin_disease
│   └── lung_disease
│
├── notebooks
│   ├── skin_training.ipynb
│   └── lung_training.ipynb
│
├── frontend
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
└── README.md
Phase 2 — Dataset Collection & Preparation

Estimated Time: 2–3 hours

Your team already decided:

Disease	Dataset
Skin disease	HAM10000 / DermNet
Lung diseases	Pneumonia dataset
Skin Disease Dataset

Example classes:

melanoma

nevus

benign keratosis

basal cell carcinoma

actinic keratosis

Preprocessing

Resize images:

224 × 224

Normalize:

pixel / 255

Augmentation:

rotation

zoom

horizontal flip

Example code

ImageDataGenerator(
 rotation_range=20,
 zoom_range=0.2,
 horizontal_flip=True
)
Phase 3 — Model Training

Estimated Time: 3–5 hours

Use Transfer Learning

Recommended models:

Model	Use
EfficientNetB0	skin disease
VGG16	pneumonia
ResNet50	optional
Example Training Pipeline
base_model = VGG16(
    weights="imagenet",
    include_top=False,
    input_shape=(224,224,3)
)

x = Flatten()(base_model.output)
x = Dense(256, activation="relu")(x)
output = Dense(1, activation="sigmoid")(x)

model = Model(base_model.input, output)

Compile

model.compile(
 optimizer="adam",
 loss="binary_crossentropy",
 metrics=["accuracy"]
)

Train

model.fit(train_data, epochs=10)
Phase 4 — Model Export

Save model.

model.save("models/pneumonia_model.h5")

Also export class labels

labels = ["normal", "pneumonia"]

json.dump(labels, open("labels.json","w"))
Phase 5 — Backend API Development

Estimated Time: 2 hours

Framework:

⭐ FastAPI

Create

backend/main.py

Example API

from fastapi import FastAPI, UploadFile
import tensorflow as tf

app = FastAPI()

model = tf.keras.models.load_model("models/pneumonia_model.h5")

@app.post("/predict")
async def predict(file: UploadFile):

    image = preprocess(file)

    pred = model.predict(image)

    return {"prediction": float(pred)}

Run server

uvicorn main:app --reload
Phase 6 — Explainability Engine (Grad-CAM)

Estimated Time: 2 hours

Explain WHY model predicted disease.

Steps

1️⃣ Get last convolution layer
2️⃣ Compute gradients
3️⃣ Create heatmap

Example

heatmap = grad_cam(model, image)

Overlay on image

original + heatmap

Return result to frontend.

Phase 7 — API Endpoints

Create endpoints

Endpoint	Purpose
/predict	disease prediction
/explain	GradCAM explanation
/health	API status

Example response

{
 "prediction": "Melanoma",
 "confidence": 0.87
}

Explain endpoint

{
 "heatmap": "base64image"
}
Phase 8 — Frontend UI

Estimated Time: 2 hours

Simple UI

Upload Image
↓
Predict Disease
↓
Show Heatmap
index.html

Components:

upload button

preview image

prediction result

explanation image

JS upload example
const formData = new FormData()
formData.append("file", image)

fetch("/predict", {
 method: "POST",
 body: formData
})
Phase 9 — Model Integration

Flow

User Upload Image
↓
Frontend sends image
↓
Backend API
↓
Model predicts
↓
GradCAM generates heatmap
↓
Frontend shows result
Phase 10 — Multi-Disease Support

Extend system to support multiple models.

/predict?type=skin
/predict?type=lung

Load models

skin_model.h5
lung_model.h5
Phase 11 — Medical Visualization

Add explainability visuals.

Examples

GradCAM heatmap

probability bar chart

disease confidence score

Libraries

Chart.js

Example

Normal      20%
Pneumonia   80%
Phase 12 — Testing & Evaluation

Metrics

Metric	Purpose
Accuracy	model performance
Precision	reduce false positives
Recall	detect disease cases
F1 Score	balance

Use

classification_report
confusion_matrix
Phase 13 — Deployment

Frontend

Vercel

Backend

Render

Steps

Deploy backend

render.com

Start command

uvicorn main:app --host 0.0.0.0 --port 10000