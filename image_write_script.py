import shutil
import os

# Path to the folder containing images
image_folder = "C:/Users\Pc/Downloads/face_dataset/img_align_celeba"
write_folder ="C:/Users\Pc/Downloads/face_dataset/img_align_celeba_new"

# Path to the text file
txt_file_path = "labels.txt"

def distribute_images(txt_path, img_folder):
    with open(txt_path, 'r') as file:
        for line in file:
            # Split the line into filename and folder number
            filename, folder_number = line.strip().split()

            # Create folder path based on folder number
            folder_path = os.path.join(write_folder, folder_number)

            # Create the folder if it doesn't exist
            os.makedirs(folder_path, exist_ok=True)

            # Build source and destination paths
            source_path = os.path.join(img_folder, filename)
            destination_path = os.path.join(folder_path, filename)
            try:
                # Move the image to the corresponding folder
                shutil.move(source_path, destination_path)
            except:
                pass
if __name__ == "__main__":
    distribute_images(txt_file_path, image_folder)
