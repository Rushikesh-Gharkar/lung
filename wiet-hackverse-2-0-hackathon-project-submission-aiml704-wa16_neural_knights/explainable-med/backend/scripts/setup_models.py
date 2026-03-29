import os
import gdown
import sys

# Directory where models should be stored
MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "ml", "models")

# Google Drive folder ID containing the models
FOLDER_ID = "1nU2jvlbVbDGIBIM82GzHn0g4o0iTMB5t"

def download_models():
    os.makedirs(MODELS_DIR, exist_ok=True)
    
    print(f"Checking for models in {MODELS_DIR}...")
    try:
        # Download the entire folder
        # We download to a temp location and then move to avoid gdown creating a subfolder
        # or we just use the MODELS_DIR as output if we are okay with it
        gdown.download_folder(id=FOLDER_ID, output=MODELS_DIR, quiet=False, use_cookies=False)
        return True
    except Exception as e:
        print(f"Error downloading models: {e}")
        return False

if __name__ == "__main__":
    if download_models():
        print("\n✅ Model setup complete.")
    else:
        print("\n❌ Model setup failed.")
        sys.exit(1)
