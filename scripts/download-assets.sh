#!/bin/bash

# Configuration
BASE_URL="https://breakoutng-assets.s3.eu-west-2.amazonaws.com"
ASSETS_DIR="public/assets"

# Create assets directory
mkdir -p "$ASSETS_DIR"

while IFS= read -r url; do
    # Skip empty lines
    [[ -z "$url" ]] && continue
    
    echo "Processing: $url"
    
    # Extract the relative path by removing the base URL
    rel_path=${url#$BASE_URL/}
    
    # Clean up the path to be more concise
    # Remove "ld/portfolio-files/nd/assets/" if it exists
    clean_path=${rel_path#ld/portfolio-files/nd/assets/}
    # Remove "ld/" if it's still at the beginning
    clean_path=${clean_path#ld/}
    
    # Target file path
    target_file="$ASSETS_DIR/$clean_path"
    target_dir=$(dirname "$target_file")
    
    # Create target directory
    mkdir -p "$target_dir"
    
    # Download the file
    if [ ! -f "$target_file" ]; then
        echo "Downloading to: $target_file"
        curl -s "$url" -o "$target_file"
    else
        echo "Skipping (already exists): $target_file"
    fi
done < s3_assets.txt

echo "Migration complete!"
