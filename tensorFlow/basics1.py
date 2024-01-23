import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import tensorflow as tf

# add if GPU IS THERE
# physical_devices = tf.config.list_physical_devices("GPU")
# tf.config.experimental.set_memory_growth(physical_devices[0], True)


# initializing variable
x = tf.constant(4, shape=(3, 3))
print(x)
x = tf.constant(3, dtype=tf.float32)
print(x)

# note : sometimes specifying the shape is important , even if its a scalar u can convert that to different shape


x = tf.constant([[1, 2, 3], [4, 5, 6]])
print(x)

# creating an identity matrix tensor
x = tf.eye(3)
print(x)

# matrix of ones
x = tf.ones((2, 2))
print(x)
print()

# creating distrubution
#### normal distrubution
x = tf.random.normal((3, 3), mean=0, stddev=1)
print(x)
#### uniform distrubution
x = tf.random.uniform((3, 3), minval=0, maxval=1)
print(x)
print()

# creating a range or sequence of values
x = tf.range(9)
print(x)
x = tf.range(start=2, limit=10, delta=3)
print(x)

# changing the dtype of the constants
x = tf.cast(x, dtype=tf.float32)

# Mathematical operations
x = tf.constant([2, 5, 6])
y = tf.constant([1, 2, 3])

z = tf.subtract(x, y)
z = tf.divide(x, y)
z = tf.add(x, y)
z = tf.multiply(x, y)
### dot product
z = tf.tensordot(x, y, axes=1)
print(z)
# z = tf.reduce_sum(x * y, axes=0)
# print(z)
###  both give same results

### matrix multiplication
x = tf.random.uniform((4, 3))
y = tf.random.uniform((3, 2))
z = tf.matmul(x, y)
# or
z = x @ y
print(z)


# indexing and splicing(its similar to numpy dont worry )\

x = tf.constant([0, 1, 2, 4, 5, 0, 1])
print(x[:])
print(x[1:])
print(x[2:5])
print(x[::2])  # alternate values
print(x[::-1])  # reverse order

# x[inital:final:step_count]
x = tf.constant([[1, 2, 3], [5, 6, 7]])
print(x[0, :])
print(x[0, 1:])

# reshaping
x = tf.range(9)
x = tf.reshape(x, (3, 3))
print(x)

# transposing
#  note for differnt values of "perm" it will behave differently
x = tf.transpose(x, perm=[1, 0])
