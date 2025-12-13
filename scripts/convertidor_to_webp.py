import os
import time
import sys
from PIL import Image

# Supported formats to convert
SUPPORTED_FORMATS = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')

def convert_to_webp(file_path):
    """Converts a single image file to WebP and removes the original."""
    try:
        # Generate new filename
        directory, filename = os.path.split(file_path)
        name, ext = os.path.splitext(filename)
        new_filename = f"{name}.webp"
        new_file_path = os.path.join(directory, new_filename)

        # Skip if webp already exists (prevent loops if monitoring)
        if os.path.exists(new_file_path):
            return

        print(f"Converting: {filename} -> {new_filename}...")
        
        with Image.open(file_path) as img:
            # Save as WebP
            img.save(new_file_path, 'webp', quality=80)
        
        # Remove original file (Optional: commented out for safety, uncomment to enable)
        # os.remove(file_path)
        print(f"Success! Saved to {new_filename}")

    except Exception as e:
        print(f"Error converting {file_path}: {e}")

def monitor_directory(path):
    """Monitors a directory for new files and converts them."""
    print(f"Monitoring directory: {path}")
    print("Press Ctrl+C to stop.")
    
    # Keep track of known files to avoid reprocessing immediate duplicates
    # (In a real watcher we'd use file events, but polling is simpler for no-dep scripts)
    known_files = set(os.listdir(path))

    try:
        while True:
            current_files = set(os.listdir(path))
            new_files = current_files - known_files

            for filename in new_files:
                if filename.lower().endswith(SUPPORTED_FORMATS):
                    full_path = os.path.join(path, filename)
                    # Wait a moment to ensure file copy is finished
                    time.sleep(1) 
                    convert_to_webp(full_path)

            known_files = current_files
            time.sleep(2) # Check every 2 seconds

    except KeyboardInterrupt:
        print("\nStopping monitor...")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python convertidor_to_webp.py <folder_path>")
        print("Example: python convertidor_to_webp.py ./uploads")
    else:
        target_folder = sys.argv[1]
        if os.path.exists(target_folder):
            monitor_directory(target_folder)
        else:
            print(f"Error: Folder '{target_folder}' does not exist.")
