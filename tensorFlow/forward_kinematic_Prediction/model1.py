import tensorflow as tf
from tensorflow import keras

import numpy as np
import pandas as pd


def angleMapper(angles):
    values = [0] * len(
        angles
    )  # Initialize the list with the correct number of elements
    for i, a in enumerate(angles):
        if i == 0:
            values[i] = np.interp(a, [-1, 1], [-180, 180])
        else:
            values[i] = np.interp(a, [-1, 1], [-90, 90])
    return values


data = pd.read_csv(r"C:\Users\91784\Downloads\training_data.csv")
data = pd.DataFrame(data)
data = data.drop_duplicates(subset=["x", "y"])
print(data)
kinematic_data = np.array(data)
# print(kinematic_data)


test_data = pd.read_csv(r"C:\Users\91784\Downloads\training_data.csv")
test_data = pd.DataFrame(data)
test_data = test_data.drop_duplicates(subset=["x", "y"])

test_kinematic_data = np.array(data)

input_test = test_kinematic_data[0:, :2]
output_test = test_kinematic_data[0:, 2:]

input = kinematic_data[0:, :2]
output = kinematic_data[0:, 2:]

print(input)
print(output)
# print(len(input[0]))
model = tf.keras.models.Sequential(
    [
        tf.keras.layers.Dense(1000, input_shape=input[0].shape, activation="relu"),
        tf.keras.layers.Dense(1000, input_shape=input[0].shape, activation="relu"),
        tf.keras.layers.Dense(len(output[0])),
    ]
)
model.compile(optimizer="adam", loss="hinge", metrics=["accuracy", "mae"])

model.fit(input, output, batch_size=input.shape[0], epochs=100000)

# print("evaluating the data")
# model.evaluate(input_test, output_test)

# model.summary()


print("testing the values")

print("actual values: ", output[0])
print("predicted values: ", model.predict(input)[0])
