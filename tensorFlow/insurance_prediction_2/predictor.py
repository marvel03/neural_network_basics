import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

df = pd.read_csv(
    r"C:\myCodes\phythonCodes\tensorFlow\insurance_prediction_2\insurance_data.csv"
)
print(df.head())

x_train, x_test, y_train, y_test = train_test_split(
    df[["age", "affordibility"]], df.bought_insurance, test_size=0.2, random_state=25
)
print(x_train.shape)

# normalizing the values by the max values, in this case 100

x_train_scaled = x_train.copy()
x_train_scaled["age"] = x_train_scaled["age"] / 100
x_train_scaled["affordibility"] = x_train_scaled["affordibility"] / 100

x_test_scaled = x_test.copy()
x_test_scaled["age"] = x_test_scaled["age"] / 100
x_test_scaled["affordibility"] = x_test_scaled["affordibility"] / 100

import tensorflow as tf
from tensorflow import keras

model = tf.keras.Sequential(
    [
        tf.keras.layers.Dense(
            1,
            input_shape=(x_train_scaled.shape[1],),
            activation="sigmoid",
            kernel_initializer="ones",
            bias_initializer="zeros",
        )
    ]
)

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
model.fit(
    x_train_scaled,
    y_train,
    epochs=5000,
)
## end of model creation

model.evaluate(x_test_scaled, y_test)
model.predict(
    x_test_scaled
)  # the output will be between 0 and 1 , if <0.5 -> output is 0 else output is 1

# to get the weights of the model
coeff, intercept = model.get_weights()
print(
    coeff, intercept
)  # coeff is the weights of the network , and intercept would be the biases (both r in array format)


####now how to use these values of coeff and intercept ,to implement this nn
def sigmoid(x):
    import math

    return 1 / (1 + math.exp(-x))


def prediction_function(age, affordibility):
    weighted_sum = coeff[0] * age + coeff[1] * affordibility + intercept
    return sigmoid(weighted_sum)


print(prediction_function(x_test_scaled[0, 0], y_test[0]))
