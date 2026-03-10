import os
import subprocess
import sys

# --- CONFIGURATION ---
INPUT_FOLDER = './videos'
OUTPUT_FOLDER = './compressed_videos'

# CRF (Constant Rate Factor): 0 is lossless, 51 is worst. 
# 28 is the default for H.265. 
# Range 24-30 is usually the sweet spot for high compression/good quality.
CRF_VALUE = 28 

# Preset: determines compression efficiency vs encoding speed.
# Options: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow.
# 'slow' provides better compression (smaller file) but takes longer to process.
PRESET = 'medium' 

# Video extensions to look for
VIDEO_EXTENSIONS = ('.mp4', '.mkv', '.mov', '.avi', '.flv', '.wmv')
# ---------------------

def compress_video(input_path, output_path):
    """
    Compresses a video using FFmpeg with H.265 codec.
    """
    try:
        # The FFmpeg command constructed as a list of arguments
        command = [
            'ffmpeg', 
            '-i', input_path,           # Input file
            '-vcodec', 'libx265',       # Video codec (HEVC)
            '-crf', str(CRF_VALUE),     # Constant Rate Factor
            '-preset', PRESET,          # Encoding speed/efficiency
            '-acodec', 'aac',           # Audio codec
            '-b:a', '128k',             # Audio bitrate
            '-movflags', '+faststart',  # Move metadata to start (good for web)
            output_path                 # Output file
        ]
        
        # Run the command and suppress verbose output (show only errors/progress)
        # Check=True raises an error if FFmpeg fails
        print(f"Processing: {os.path.basename(input_path)}...")
        subprocess.run(command, check=True, stderr=subprocess.DEVNULL)
        print(f"Done! Saved to: {output_path}")
        return True

    except subprocess.CalledProcessError:
        print(f"Error converting {input_path}")
        return False
    except FileNotFoundError:
        print("Error: FFmpeg not found. Please ensure it is installed and in your PATH.")
        sys.exit(1)

def main():
    # Create output directory if it doesn't exist
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    # Check if input directory exists
    if not os.path.exists(INPUT_FOLDER):
        print(f"Input folder '{INPUT_FOLDER}' does not exist.")
        print("Please create it and put your videos inside.")
        return

    files_found = 0
    
    # Loop through files in the input directory
    for filename in os.listdir(INPUT_FOLDER):
        if filename.lower().endswith(VIDEO_EXTENSIONS):
            files_found += 1
            input_full_path = os.path.join(INPUT_FOLDER, filename)
            
            # Construct output filename (keep original name but ensure .mp4)
            name_without_ext = os.path.splitext(filename)[0]
            output_filename = f"{name_without_ext}_compressed.mp4"
            output_full_path = os.path.join(OUTPUT_FOLDER, output_filename)

            # Skip if already exists to prevent overwriting
            if os.path.exists(output_full_path):
                print(f"Skipping {filename}, output already exists.")
                continue

            compress_video(input_full_path, output_full_path)

    if files_found == 0:
        print(f"No video files found in '{INPUT_FOLDER}'.")
    else:
        print("\nBatch compression complete.")

if __name__ == "__main__":
    main()