"""
Create a proper VGG16-based Lung Cancer model (3-class: Normal, Benign, Malignant).
This script creates a model with the correct architecture that the backend expects.

Run this once to generate 'lung_cancer_model.h5'.
It creates an untrained model with random weights — replace with your trained weights 
by running 04_model_vgg16.py from the lung_cancer/ folder.

Usage:
    python create_lung_cancer_model.py
"""
import os
import numpy as np

print("Creating VGG16 3-class Lung Cancer model architecture...")

try:
    import tensorflow as tf
    from tensorflow.keras.applications import VGG16
    from tensorflow.keras import layers, models

    IMG_SIZE = 224
    NUM_CLASSES = 3  # Normal=0, Benign=1, Malignant=2

    # Build the same architecture used in 04_model_vgg16.py
    base_model = VGG16(
        weights='imagenet',
        include_top=False,
        input_shape=(IMG_SIZE, IMG_SIZE, 3)
    )
    base_model.trainable = False  # freeze all base layers

    inputs  = layers.Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x       = base_model(inputs, training=False)
    x       = layers.GlobalAveragePooling2D()(x)
    x       = layers.Dense(512, activation='relu')(x)
    x       = layers.BatchNormalization()(x)
    x       = layers.Dropout(0.5)(x)
    x       = layers.Dense(256, activation='relu')(x)
    x       = layers.Dropout(0.4)(x)
    outputs = layers.Dense(NUM_CLASSES, activation='softmax')(x)

    model = models.Model(inputs, outputs, name='LungCancer_VGG16')

    # Save to the models directory
    save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lung_cancer_model.h5')
    model.save(save_path)
    print(f"Saved: {save_path}")
    print(f"Model size: {os.path.getsize(save_path) / 1024 / 1024:.1f} MB")
    print()
    print("NOTE: This model has the correct architecture but RANDOM weights.")
    print("To use real weights, save your trained model from 04_model_vgg16.py as:")
    print(f"  {save_path}")

except Exception as e:
    print(f"Error: {e}")
    raise
