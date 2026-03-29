import os
import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

def create_model():
    print("Creating ResNet50 base model...")
    base_model_resnet = ResNet50(
        weights=None, # No need to download weights for dummy
        include_top=False,
        input_shape=(224, 224, 3)
    )

    x = base_model_resnet.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    output = Dense(1, activation='sigmoid')(x)

    resnet_model = Model(inputs=base_model_resnet.input, outputs=output)
    
    resnet_model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return resnet_model

if __name__ == "__main__":
    os.makedirs(os.path.join(os.path.dirname(__file__), 'models'), exist_ok=True)
    model_path = os.path.join(os.path.dirname(__file__), 'models', 'medical_model.h5')
    
    print(f"Generating dummy model...")
    model = create_model()
    
    print(f"Saving dummy model to {model_path}...")
    model.save(model_path)
    
    print("Done! You can now load this model in your FastAPI backend.")
