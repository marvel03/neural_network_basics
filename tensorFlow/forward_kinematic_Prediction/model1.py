import tensorflow as tf
from tensorflow import keras

import numpy as np
import pandas as pd

data = pd.read_csv(r"C:\Users\91784\Downloads\training_data.csv")
kinematic_data = np.array(data)
print(kinematic_data)

input = kinematic_data[0:, :2]
output = kinematic_data[0:, 2:]
# print(input.shape)
# print(input[0].shape)
# print(len(input[0]))
model = tf.keras.models.Sequential(
    [
        tf.keras.layers.Dense(64, input_shape=input[0].shape, activation="relu"),
        tf.keras.layers.Dense(32, activation="relu"),
        tf.keras.layers.Dense(len(output[0])),
    ]
)
model.compile(optimizer="adam", loss="mean_squared_error", metrics=["mae"])

model.fit(input, output, batch_size=10, epochs=1000)
