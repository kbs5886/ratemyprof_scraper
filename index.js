import fetch from "node-fetch";
const query = "grosh";
const url = `https://www.ratemyprofessors.com/search/teachers?query=${query}`;

fetch(url)
  .then((res) => res.text())
  .then((data) => {
    const i = data.search("<script>");
    const scriptTag = data.substring(i);
    const first = scriptTag.search("window.__RELAY_STORE__ = ");
    const second = scriptTag.search("window.process = {}");
    const test = scriptTag.substring(first + 25, second);
    const firstNamesIndexes = search(test, "firstName");
    const lastNameIndexes = search(test, "lastName");
    const avgRatingIndexes = search(test, "avgRating");
    const departmentIndexes = search(test, "department");
    const avgDifficultyIndexes = search(test, "avgDifficulty");
    const schoolIndexes = search(test, "School");

    const ratings = [];

    for (let i = 0; i < firstNamesIndexes.length; i++) {
      let fString = test.substring(firstNamesIndexes[i] + 12);
      let lString = test.substring(lastNameIndexes[i] + 11);
      let rString = test.substring(avgRatingIndexes[i] + 11);
      let dString = test.substring(departmentIndexes[i] + 13);
      let adString = test.substring(avgDifficultyIndexes[i] + 15);
      let schoolString = test.substring(schoolIndexes[i] + 15);
      let f = fString.search('"');
      let l = lString.search('"');
      let r = rString.search(",");
      let d = dString.search('"');
      let ad = adString.search(",");
      let s = schoolString.search('"');
      let fName = fString.substring(0, f);
      let lName = lString.substring(0, l);
      let rating = rString.substring(0, r);
      let department = dString.substring(0, d);
      let avgDifficulty = adString.substring(0, ad);
      let school = schoolString.substring(0, s);
      ratings.push({
        name: fName + " " + lName,
        rating: rating,
        department: department,
        difficulty: avgDifficulty,
        school: school,
      });
    }

    console.log(ratings);
  });

function search(str, search) {
  var startingIndices = [];

  var indexOccurence = str.indexOf(search, 0);

  while (indexOccurence >= 0) {
    startingIndices.push(indexOccurence);

    indexOccurence = str.indexOf(search, indexOccurence + 1);
  }
  return startingIndices;
}
