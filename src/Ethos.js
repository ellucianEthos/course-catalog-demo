import axios from 'axios';

//
// Class to hold all the Ethos data and associated api calls
//
class Ethos {

    apiKey = null;
    academicPeriods = [];
    courses = [];
    subjects = [];
    instructionalEvents = [];
    rooms = [];
    buildings = [];
    sites = [];

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    //
    // Get a jwt (JSON Web Token) for the specified api key
    //
    async getJwt(apiKey) {

        let result = await axios({
            method: 'post',
            url: 'https://integrate.elluciancloud.com/auth',
            headers: {'Authorization': 'Bearer ' + apiKey}
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return {};
        });

        return result;
    }

    //
    // Load data (academic periods, courses, subjects)
    //
    async load() {
        console.log("load()");

        let jwt = await this.getJwt(this.apiKey);

        if (jwt) {
            this.academicPeriods = await this.getAllApiData("academicPeriods",jwt);
            this.academicPeriods = this.sort(this.academicPeriods,"title");
            this.subjects = await this.getAllApiData("subjects",jwt);
            this.rooms = await this.getAllApiData("rooms",jwt);
            this.buildings = await this.getAllApiData("buildings",jwt);
            this.sites = await this.getAllApiData("sites",jwt);
        } else {
            return false;
        }

        console.log("academicPeriods",this.academicPeriods);
        console.log("courses",this.courses);
        console.log("subjects",this.subjects);
        console.log("rooms",this.rooms);
        console.log("buildings",this.buildings);
        console.log("sites",this.sites);
        console.log("instructionalEvents",this.instructionalEvents);

        return true;
    }

    sort(array, field) {
           return array.sort((a, b) => {
               var textA = a[field].toLowerCase();
               var textB = b[field].toLowerCase();
               return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
           });
       }

    //
    // Makes all the calls to page thru a specified api
    //
    async getAllApiData(apiName, jwt) {

        let loading = true;
        let offset = 0;
        let pagesize = null;
        let total = null;
        let data = [];

        while (loading) {
            let response = null;

            switch (apiName) {
                case 'academicPeriods':
                    response = await this.getAcademicPeriods(jwt,offset,pagesize);
                    break;
                case 'courses':
                    response = await this.getCourses(jwt,offset,pagesize);
                    break;
                case 'subjects':
                    response = await this.getSubjects(jwt,offset,pagesize);
                    break;
                case 'rooms':
                    response = await this.getRooms(jwt,offset,pagesize);
                    break;
                case 'buildings':
                    response = await this.getBuildings(jwt,offset,pagesize);
                    break;
                case 'sites':
                    response = await this.getSites(jwt,offset,pagesize);
                    break;
                default:
                    throw new Error("Unknown apiName " + apiName);
            }

            if (response) {
                //console.log(response);
                data = data.concat(response.data);

                if (!total) {
                    total = parseInt(response.headers['x-total-count'],10);
                }

                //if (!pagesize) {
                    pagesize = response.data.length;
                //}

                if (data.length >= total) {
                    loading = false;
                } else {
                    offset += pagesize;
                }

            } else {
                console.error("Api returned an empty response.");
                loading = false;
            }

        }

        return data;
    }

    async getAcademicPeriods(jwt, offset, pagesize) {

        let url = "https://integrate.elluciancloud.com/api/academic-periods"
        url += "?offset=" + offset;

        if (pagesize) {
            url += "&limit=" + pagesize;
        }

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getCourses(jwt, offset, pagesize) {

        let url = "https://integrate.elluciancloud.com/api/courses";
        url += "?offset=" + offset;

        if (pagesize) {
            url += "&limit=" + pagesize;
        }

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getSubjects(jwt, offset, pagesize) {

        let url = "https://integrate.elluciancloud.com/api/subjects";
        url += "?offset=" + offset;

        if (pagesize) {
            url += "&limit=" + pagesize;
        }

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getRooms(jwt, offset, pagesize) {

        let url = "https://integrate.elluciancloud.com/api/rooms";
        url += "?offset=" + offset;

        if (pagesize) {
            url += "&limit=" + pagesize;
        }

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getBuildings(jwt, offset, pagesize) {

        let url = "https://integrate.elluciancloud.com/api/buildings";
        url += "?offset=" + offset;

        if (pagesize) {
            url += "&limit=" + pagesize;
        }

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getSites(jwt, offset, pagesize) {

        let url = "https://integrate.elluciancloud.com/api/sites";
        url += "?offset=" + offset;

        if (pagesize) {
            url += "&limit=" + pagesize;
        }

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getSections(jwt, academicPeriodId) {
        //console.log("getSections()",academicPeriodId,jwt);

        // banner let url = `https://integrate.elluciancloud.com/api/sections?criteria={ "academicPeriod" : "${academicPeriodId}"}`;
        let url = `https://integrate.elluciancloud.com/api/sections?criteria={ "academicPeriod" :  { "id": "${academicPeriodId}"} }`;

        //console.log(url);

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            console.log("sections",response);
            return response.data;
        })
        .catch((err) => {
            return [];
        });

        return result;
    }

    async getCourse(jwt, id) {
        let url = "https://integrate.elluciancloud.com/api/courses/" + id;

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getSubject(jwt, id) {
        let url = "https://integrate.elluciancloud.com/api/subjects/" + id;

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getInstructionalEvent(jwt, sectionId) {
        let url = `https://integrate.elluciancloud.com/api/instructional-events?criteria={"section" : {"id" : "${sectionId}" }}`;

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async getRoom(jwt, id) {
        let url = `https://integrate.elluciancloud.com/api/rooms/${id}`;

        let result = await axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + jwt}
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.error(err);
            return null;
        });

        return result;
    }

    async searchForSections(academicPeriodId) {
        console.log(`ethos.searchForSections(${academicPeriodId})`);

        if (academicPeriodId === "test") {
            return this.getTestSearchResults();
        }

        let jwt = await this.getJwt(this.apiKey);

        let sections = await this.getSections(jwt, academicPeriodId);
        console.log("Sections results", sections);

        let results = await this.buildSearchResults(jwt, sections);
        console.log("Search results for UI", results);

        return results;
    }

    //
    // Find methods search local arrays for data models
    //
    findSubject(id) {
        return this.subjects.find((subject) => {
            return subject.id === id;
        });
    }

    findSite(id) {
        return this.sites.find((site) => {
            return site.id === id;
        });
    }

    findRoom(id) {
        return this.rooms.find((room) => {
            return room.id === id;
        });
    }

    findBuilding(id) {
        return this.buildings.find((building) => {
            return building.id === id;
        });
    }

    findCourse(id) {
        return this.courses.find((course) => {
            return course.id === id;
        });
    }

    findInstructionalEvent(sectionId) {
        return this.instructionalEvents.find((event) => {
            return event.section.id === sectionId;
        });
    }

    findRoomIdFromInstrucionalEvent(instructionalEvent) {
        let id = null;
        if (instructionalEvent.locations && instructionalEvent.locations.length > 0) {
            if (instructionalEvent.locations[0].location) {
                if (instructionalEvent.locations[0].location.room && instructionalEvent.locations[0].location.room.id) {
                    id = instructionalEvent.locations[0].location.room.id;
                }
            }
        }
        return id;
    }

    addCourseToCache(course) {
        if (course) {
            let found = this.findCourse(course.id);
            if (!found) {
                this.courses.push(course);
            }
        }
    }

    addRoomToCache(room) {
        if (room) {
            let found = this.findCourse(room.id);
            if (!found) {
                this.rooms.push(room);
            }
        }
    }

    addInstructionalEventToCache(instructionalEvent) {
        if (instructionalEvent) {
            let found = this.findCourse(instructionalEvent.section.id);
            if (!found) {
                this.instructionalEvents.push(instructionalEvent);
            }
        }
    }

    getTestSearchResults() {
        let results = [];
        let result = this.getEmptySearchResult();
        results.push(result);

        result = this.getEmptySearchResult();
        result.id = "111";
        result.title = "Math 101";
        result.courseId = "111";
        result.courseTitle = "Math 101";
        result.courseDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet";
        result.subject = "Mathematics";
        result.schedule = "M W F 10:00 AM";
        result.location = "Smith Hall, Room 100";
        results.push(result);

        return results;
    }

    createEmptySearchResult() {
        return {
            id: "",
            title: "missing title",
            courseId: "",
            courseTitle: "missing course title",
            courseDesc: "missing course description",
            subject: "missing subject",
            dates: "missing dates",
            schedule: "missing schedule",
            location: "missing location",
            site: "missing site",
            creditDesc: "missing credit description"
        }
    }

    async buildSearchResults(jwt, sections) {
        let results = [];

        for (let i = 0; i < sections.length; i++) {
            let result = this.createEmptySearchResult();
            result.id = sections[i].id;
            result.title = sections[i].title;
            result.courseId = sections[i].course.id;
            result.dates = this.formatStartEndDate(sections[i]);

            let course = this.findCourse(sections[i].course.id);
            if (!course) {
                course = await this.getCourse(jwt, sections[i].course.id);
                this.addCourseToCache(course);
            }

            if (course) {
                console.log("Found Course", course);
                result.courseTitle = course.title;
                result.courseDesc = course.description;
                result.creditDesc = this.formatCreditDescription(course);

                let subject = this.findSubject(course.subject.id);
                if (subject) {
                    console.log("Found Subject", subject);
                    result.subject = `${subject.title} (${subject.abbreviation})`;
                }
            }

            let site = this.findSite(sections[i].site.id);
            if (site) {
                console.log("Found Site",site);
                result.site = `${site.title} (${site.code})`;
            }

            let instructionalEvent = this.findInstructionalEvent(sections[0].id);
            if (!instructionalEvent) {
                instructionalEvent = await this.getInstructionalEvent(jwt, sections[0].id);
                if (instructionalEvent && instructionalEvent.length > 0) {
                    // just use first available in array
                    this.addInstructionalEventToCache(instructionalEvent[0]);
                    instructionalEvent = instructionalEvent[0];
                }
            }

            if (instructionalEvent) {
                console.log("Found Instructional Event",instructionalEvent);
                result.schedule = this.formatSchedule(instructionalEvent);

                let roomId = this.findRoomIdFromInstrucionalEvent(instructionalEvent);
                if (roomId) {
                    let room = this.findRoom(roomId);
                    if (!room) {
                        room = await this.getRoom(jwt,roomId);
                        this.addRoomToCache(room);
                    }
                    if (room) {
                        console.log("Found Room", room);
                        result.location = `Room: ${room.number}`;
                        if (room.building && room.building.id) {
                            let building = this.findBuilding(room.building.id);
                            if (building) {
                                console.log("Found Building",building);
                                result.location = `Building: ${building.title}, ` + result.location;
                            }
                        }
                    }
                }
            }

            results.push(result);
        }

        return results;
    }

    //
    // Format methods take model data and format it nicely for UI
    //
    formatCreditDescription(course) {
        let creditDescription = null;
        if (course) {
            if (course.credits && course.credits.length > 0) {
                creditDescription = `Credit Measure: ${course.credits[0].measure}, Max: ${course.credits[0].maximum}, Min: ${course.credits[0].minimum}`;
            }
        }
        return creditDescription;
    }

    formatSchedule(instructionalEvent) {
        let label = "";
        if(instructionalEvent) {
            if (instructionalEvent.recurrence) {
                if (instructionalEvent.recurrence.timePeriod) {
                    let s = this.formatTime(instructionalEvent.recurrence.timePeriod.startOn);
                    let e = this.formatTime(instructionalEvent.recurrence.timePeriod.endOn);
                    label += `${s} - ${e}`;
                }
                if (instructionalEvent.recurrence.repeatRule) {
                    label += " | " + instructionalEvent.recurrence.repeatRule.type;
                    if (instructionalEvent.recurrence.repeatRule.daysOfWeek && instructionalEvent.recurrence.repeatRule.daysOfWeek.length > 0) {
                        label += " - " + instructionalEvent.recurrence.repeatRule.daysOfWeek.join();
                    }
                }
            }
        }
        return label;
    }

    formatStartEndDate(section) {
        let label = null;
        if (section) {
            let s = this.formatDate(section.startOn);
            let e = this.formatDate(section.endOn)
            label = ` Start Date: ${s}, End Date: ${e}`;
        }
        return label;
    }

    formatDate(dateString) {
        let label = null;
        try {
            let d = new Date(dateString);
            label = d.toLocaleDateString();
        } catch(e) {
            // do nothing
        }
        return label;
    }

    formatTime(dateString) {
        let label = null;
        try {
            let d = new Date(dateString);
            label = d.toLocaleTimeString();
        } catch(e) {
            // do nothing
        }
        return label;
    }

    // formatLocation(instructionalEvent) {
    //     let label = "";
    //     if (instructionalEvent.locations && instructionalEvent.locations.length > 0) {
    //         if (instructionalEvent.locations[0].location) {
    //             let location = instructionalEvent.locations[0].location;
    //             if (location.room && location.room.id) {
    //                 label = location.room.id;
    //                 let room = this.findRoom(location.room.id);
    //
    //                 console.log("room", room);
    //             }
    //         }
    //     }
    //     console.log("formatLocation()", label);
    //     return label;
    // }

}

export default Ethos;
