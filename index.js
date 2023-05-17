const mongoose = require("mongoose");

// connecting to mongoDB
mongoose.connect(process.env.MOMGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Create a person with this prototype:

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  age: Number,
  FavoriteFoods: [String],
});

const Person = mongoose.model("Person", PersonSchema);

const createAndSavePerson = function (newPerson) {
  const joe = new Person({
    name: "malik",
    age: 23,
    favoriteFoods: ["Apple", "Orange"],
  });

  joe.save((err, newPerson) => {
    if (err) return newPerson(err);
    return newPerson(null, data);
  });
};




//Create Many Records with model.create()


const peopleArr = [
  { name: "said",email: "said@gmail.com" , age: 34, favoriteFoods: ["Makloub"] },
  { name: "sana", email: "sana@prv.edu", age: 26, favoriteFoods: ["lablebi"] },
  { name: "youssef",email: "youssef@tweet.com" ,age: 18, favoriteFoods: ["ruz" , "burritos"] },
];

const createManyPeople = (peopleArr, done) => {
  Person.create(peopleArr, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

//Use model.find() to Search Your Database


const FindPerson = (PersonName) => {
  let FoundPerson = Person.find({ name: PersonName });
  if (err) return console.log(err);
  return FoundPerson;
};


//Use model.findOne() to Return a Single Matching Document from Your Database



const FindPersonWithFood = (Food) => {
  let FoundPerson = Person.findOne({ FavoriteFoods: Food });
  if (err) return console.log(err);
  return FoundPerson;
};



//Use model.findById() to Search Your Database By _id



const FindPersonWithId = (personId) => {
  let FoundPerson = Person.findById({ _id: personId });
  if (err) return console.log(err);
  return FoundPerson;
};

//Perform Classic Updates by Running Find, Edit, then Save


const EditSave = (personId, foodToAdd) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    data.FavoriteFoods.push(foodToAdd);
    data.save((err, dataNext) =>
      err
        ? console.error("error saving data: ", err.message)
        : done(null, dataNext)
    );
  });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, ageToSet) => {
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true },
    (err) => {
      console.log(err);
    }
  );
};

//Delete One Document Using model.findByIdAndRemove

const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err) =>
    err ? console.log(err) : console.log("done")
  );
};

//MongoDB and Mongoose - Delete Many Documents with model.remove()


const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, (err, data) =>
      err ? done(err, data) : done(null, data)
    );
  };

//Chain Search Query Helpers to Narrow Search Results


  const searchSort = (done) => {
    const foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, dataNext) =>
        err
          ? console.error("error getting data: ", err.message)
          : done(null, dataNext)
      );
  };
