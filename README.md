
# JSON Parse Language

For parsing the complex json in a simple way by specing it.


## Guide
```javascript
const transformObject = require(".");
transformObject(data,spec)
```

For accessing a key you can put @
For example
```javascript
{
    name: "@profile.name"
}
```

For concatenating 

```javascript
{
    name: "@profile.name + @profile.address"
}
```

```javascript
{
    name: "@profile.name + 'is good'"
}
```

For array operations 

```javascript
{
    name: "@profile.marks[*].mark"
}
```


## Example

```javascript
const complexJSON={
    name: "Govind",
    progressCard: {
        marks: [{
            subject: "Mathematics",
            mark: 49,
            outOf: 50
        },
        {
            subject: "Physics",
            mark: 40,
            outOf: 50
        },],
        age: 29
    }
}

const specJSON = {
    name: "@name",
    totalMarksReceived:"@progressCard.marks[*].mark",
    totalMarks:"@progressCard.marks[*].outOf",
    note: "@name+' is good at mathematics'"
}

// Output Will be 
{
    name: "Govind",
    totalMarksReceived: 89,
    totalMarks: 100,
    note: "Govind is good at mathematics"
}
```
