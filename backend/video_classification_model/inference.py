import os, time
import numpy as np
import pandas as pd
import tensorflow.keras as keras
from .utils.utils import save_test_duration
from .extract_cover.extract_cover import extract_cover

cur_directory = os.path.dirname(os.path.realpath(__file__))


def get_model_input_csv(filepath):
    csv_file_path = extract_cover(filepath)

    # current csv should be three columns, we only want last column, and also rotate it
    # and add a header, since the original inference function assumes csv has header
    bitrate_cover_df = pd.read_csv(csv_file_path, header=None)
    frame_sizes = bitrate_cover_df[2].values
    header = [f'size{i}' for i in range(len(frame_sizes))]

    # Creating the output DataFrame
    output_df = pd.DataFrame(columns=header)

    # Adding the frame sizes as the first row in the output DataFrame
    output_df.loc[0] = list(frame_sizes)

    # Save the DataFrame to a CSV file
    output_path = f'{cur_directory}/data_csv/one_video.csv'
    output_df.to_csv(output_path, index=True)       # yes, because original files had index

    return output_path



def inference(x_test):
    start_time = time.time()

    model = keras.models.load_model(f'{cur_directory}/best_model.hdf5')
    
    y_pred = model.predict(x_test)
    y_pred_numbered = np.argmax(y_pred, axis=1)

    test_duration = time.time() - start_time
    save_test_duration(f'{cur_directory}/test_duration.csv', test_duration)
    return y_pred_numbered


def run_inference(filepath):
    # note, we are only running inference on 1 video at a time.
    # simply because of how the front-end is set up
    # and to save storage on our cheap cloud server
    
    # 1. extract cover first
    formatted_csv_path = get_model_input_csv(filepath)

    # 2. run inference
    start = time.time()
    
    possible_categories = ['Beauty', 'Education', 'Entertainment', 'Knowledge', 'Music', 'News', 'Sports', 'Technology', 'Food', 'Game', 'Movie']
    
    data_path=f'{cur_directory}/data_csv'
    x_test = pd.read_csv(formatted_csv_path)
    print(x_test.shape)
    x_test = x_test.iloc[:, :3000]
    
    y_pred_numbered = inference(x_test)
    results = list(map(lambda x: possible_categories[x], y_pred_numbered))

    end = time.time()
    print('Running time: %s Seconds' % (end - start))
    print(results[0])
    return str(results[0])       # since we are only doing one at a time, for now


if __name__ == "__main__":
    run_inference()
