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

## Operators, If-Else

```swift
import Foundation

let yearsOfExperience = 10
let jobRequiredExperience = 5

if yearsOfExperience > jobRequiredExperience {
    "Over matched!"
} else if yearsOfExperience == jobRequiredExperience {
    "Matched!"
} else {
    "Unmatched!"
}

let currentSalary = 30
let salaryRaiseRatio = 10 // percentage

var newSalary = currentSalary * (100 + salaryRaiseRatio)/100
newSalary

// 1. unary prefix
let inCorrect = !true
// 2. unary postfix
let name = Optional("abc")
type(of: name)
var unaryPostFix = name
type(of: unaryPostFix)
// 3. binary infix
let fullname = "S" + " " + "N"

// Default is non optional
var x: String
// x => this will cause error
// Optional
var phoneNumber: String? = Optional.none
type(of: phoneNumber)
phoneNumber = "09123123"
print(phoneNumber)
if phoneNumber == nil {
    "Phone number is empty"
} else {
    "Phone number is \(phoneNumber!)"
}

let today: Date = Date()
let calendar = Calendar.current
let currentYear = calendar.component(.year, from: today)
print(type(of: currentYear))
print(currentYear)

func isLeapYear(year: Int) -> Bool {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
}

let message: String;
message = isLeapYear(year: currentYear) ? "\(currentYear) is a leap year" : "\(currentYear) is not a leap year"
print(message)

var cardinalNumbers: [String] = []

cardinalNumbers.append("zero")
cardinalNumbers.append("one")
cardinalNumbers.append("two")
cardinalNumbers.append("three")
cardinalNumbers.append("four")
cardinalNumbers.append("five")
cardinalNumbers.append("six")
cardinalNumbers.append("seven")
cardinalNumbers.append("eight")
cardinalNumbers.append("nine")

func readThePhoneNumber(cardinalNumbers: [String], phoneNumber: String) -> String {
    var message = ""

    for c in phoneNumber {
        let index = Int(String(c)) ?? -1
        message += index != -1 ? " \(cardinalNumbers[index])" : " ?"
    }
    return message.trimmingCharacters(in: [" "])
}

print(readThePhoneNumber(cardinalNumbers: cardinalNumbers, phoneNumber: "09012345678"))

```
