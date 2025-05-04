---
sidebar_position: 2
displayed_sidebar: iosSidebar
---

# Swift Basic Tutorial

## Variables

```swift
import Foundation

// let: can not be assigned again
// var: can be assigned again

let myFirstName = "Son"
let myLastName = "Nguyen"

var programmingLanguages = [
    "Swift"
]

programmingLanguages.append("PHP")

let cities = [
    "Ho Chi Minh",
    "Ha Noi"
]

// value copy
var big_cities = cities

big_cities.append("Da Nang")

cities
big_cities

// mutable array

let fruits = NSMutableArray(
    array: [
        "orange"
    ]
)

fruits.add("apple")

var favoriteFruits = fruits
favoriteFruits.add("pineapple")
fruits
favoriteFruits

func copyFruits(_ fruits: NSArray){
    var copy = fruits as! NSMutableArray
    copy.add("watermelon")
}

copyFruits(fruits)
fruits
```
