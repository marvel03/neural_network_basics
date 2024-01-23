import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt
import numpy as np

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train_flattened = x_train.reshape(
    len(x_train), x_train[0].shape[0] * x_train[0].shape[1]
)
x_test_flattened = x_test.reshape(len(x_test), x_test[0].shape[0] * x_test[0].shape[1])
# print(x_train_flattened.shape)

### now note: u must normalize the input data before u input it ok(it is optional and done to only increase the accuracy of the training )
x_train_flattened = x_train_flattened / 255  # max value is 255
# print(x_train_flattened)
x_test_flattened = x_test_flattened / 255
###
# print(x_train_flattened[0].shape
## creating the model (these r the general steps involved ok, create layers ,compile it , fit it )
# model = tf.keras.Sequential(
#     [
#         keras.layers.Dense(
#             10,  # total ouput neurons
#             input_shape=(x_train_flattened.shape[1],),  # total input neurons
#             activation="sigmoid",
#         )
#     ]
# )
## to make it multi-layered
model = tf.keras.Sequential(
    [
        keras.layers.Dense(  # first hidden layer
            100,
            input_shape=(x_train_flattened.shape[1],),  # total input neurons
            activation="relu",
        ),
        keras.layers.Dense(10, activation="sigmoid"),
    ]
)
model.compile(
    optimizer="adam",  # this helps u reach ur goal faster
    loss="sparse_categorical_crossentropy",  # this is the same as what mean square error(MSE) does, this one is used for classifying problems
    metrics=["accuracy"],
)

model.fit(x_train_flattened, y_train, epochs=5)

## now testing the data, note we only get scores from our output, each output neuron represents a no.
## and each neuron will output a certain score(between 0 and 1) ,based on the highest score we determine which no. it is
#### first testing it on test dataset
# print("testing it on test data")
# model.evaluate(x_test_flattened, y_test)
# # this will ouput the score on each neuron, for all the input in this set
# model.summary()

# # predicting a custom image
# plt.matshow(x_test[0])
# plt.show()

# y_Predicted = model.predict(x_test_flattened)
# predicted_score = y_Predicted[0]
# number = np.argmax(predicted_score)  # prints the index of the highest score
# print("ur predicted value for the input is: ", number)
