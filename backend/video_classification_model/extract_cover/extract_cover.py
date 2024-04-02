import os, sys
from os.path import join, basename, isfile, splitext
import subprocess 
from .ffmpeg_bitrate_stats.__main__ import extract_bitrate_python_interface


def extract_cover(input_file_path):
    cur_directory = os.path.dirname(os.path.realpath(__file__))
    _output_dir = f"{cur_directory}/csv_cover_outputs/"

    # checking if it is a file
    if isfile(input_file_path):
        extract_bitrate_python_interface(_input=input_file_path, 
                                         custom_output_dir=_output_dir,
                                         aggregation="time",
                                         output_format="csv")

        # parse output folder and return exact path
        out_file_name = splitext(basename(input_file_path))[0]
        output_file_path = f"{_output_dir}/{out_file_name}.csv"
        return output_file_path
    
        
if __name__ == "__main__":
    in_filepath = input("path of file: ")
    extract_cover(in_filepath)

