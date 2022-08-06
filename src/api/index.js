import axios from "axios";
import config from "../config/config";
import moment from "moment";


class api {

  async loadApplicationsFloatList() {
    return this.get("applicationsFloatNSRList");
  }

  async loadPermitList(isMine) {
    return this._loadApplicationsFloatListWithFilter(config.permitStatuses, isMine);
  }

  async loadRefusalList(isMine) {
    return this._loadApplicationsFloatListWithFilter(config.refusalStatuses, isMine);
  }

  async _loadApplicationsFloatListWithFilter(statuses, isMine) {

    let filter = "";
    if (statuses || isMine) {
      let whereClause = "";
      if (statuses) {
        const statusesFilter = statuses.map((name) => `"${name}"`).join();
        whereClause += `"statusName":{"inq":[${statusesFilter}]}`;
      }
      if (isMine) {
        if (whereClause) whereClause += ",";
        whereClause += `"isCurrentUserOwner":{"eq":1}`;
      }
      filter = `?filter={"where":{${whereClause}}}`;
    }

    return this.get(`applicationsFloatNSRList${filter}`);
  }

  async loadCargoTypes() {
    return this.get("cargoTypes");
  }

  async loadHazardClasses() {
    return this.get("hazardClasses");
  }

  async loadAvailableShips() {
    return this.get("ships");
  }

  async loadShips() {
    return this.get('ships?filter={"include":["flag","shipType"]}');
  }

  async loadShip(id) {
    return this.get(`ships/${id}`);
  }

  async loadCountries() {
    return this.get("countries");
  }

  async loadShipTypes() {
    return this.get("shipTypes");
  }

  async loadIceClasses() {
    return this.get("iceClasses");
  }

  async loadPortPlaces() {
    return this.get("portplaces");
  }

  async loadUserCompanies() {
    //TODO расшить userId = 1
    return this.get("users/1/companies");
    //return this.getAuth("userCompanies");
    //http://10.20.30.102:3000/applicationsFloatNSRList?filter[order]=id%20DESC&filter[limit]=30
  }

  async loadStatuses() {
    return this.get("statuses");
  }

  async loadWorkTypes() {
    const response = await axios(`${config.publicationURL}/workTypes`)
      .catch(this._handleError);

    return response ? response.data : null;
  }

  async loadApplicationFloat(id) {
    if (typeof id === "string") {
      return this.get(`applicationsFloatNSRList/${id}`);
    }
    else {
      return this.get(`applicationsFloatNSR/${id}`);
    }
  }

  async loadApplicationFloatApplicant(id) {
    return this.get(`applicationsFloatNSR/${id}/applicant`);
  }

  async loadApplicationFloatShip(id) {
    return this.get(`applicationsFloatNSR/${id}/ship`);
  }

  async loadApplicationFloatWorks(id) {
    return this.get(`applicationsFloatNsrWorks?filter={"where":{"applicationId":{"eq":${id}}}}`);
  }

  async loadRouteTrack(trackId) {
    if (!trackId) {
      return null;
    }

    const actions = [
      this.get(`tracks/${trackId}`),
      this.get(`tracks/${trackId}/track-points`)
    ];
    const result = await Promise.allSettled(actions);


    const prepareTrackPointsForRoute = (value) => {
      if (!value || !value.length) {
        return value;
      }

      //сортировать по порядку: у точки предыдущая точка совпадает с предыдущей точкой в массиве
      let routePoints = value.filter((p) => p.cposition.type === "Point");

      const pointsEqual = (p1, p2) => p1[0] === p2[0] && p1[1] === p2[1];

      const result = [];
      const firstPoint = routePoints.find((p) => !p.pposition) || routePoints[0];


      let nextPoint = firstPoint;
      if (nextPoint) {
        routePoints = routePoints.filter((p) => p.tpid !== nextPoint.tpid);
      }

      while (nextPoint) {
        result.push(nextPoint);
        nextPoint = routePoints.find((p) => pointsEqual(p.pposition.coordinates, nextPoint.cposition.coordinates));
        if (nextPoint) {
          routePoints = routePoints.filter((p) => p.tpid !== nextPoint.tpid);
        }
      }

      return result;
    };

    const track = result[0].value;
    track.trackPoints = prepareTrackPointsForRoute(result[1].value);

    return track;
  }

  async loadNotifications() {
    //TODO расшить userId = 1
    const dateFrom = moment().add(-config.notificationsDaysLimit, "days").format("YYYY-MM-DD");
    const filter = `?filter[order]=reg_date%20DESC&filter[limit]=${config.notificationsLimit}&filter[where][reg_date]={"gte":"${dateFrom}"}`;

    return this.get(`notifications/user/1/${filter}`);
  }

  async markNotificationAsDone(id) {
    axios.post(`${config.publicationURL}/notifications/${id}/user/1/done`);
  }

  async updateApplicationFloat(value) {

    value = this._prepareValueBeforeUpdate(value);

    if (value.id) {
      //сохранение
      const response = await axios.patch(`${config.publicationURL}/applicationsFloatNSR/${value.id}`, value)
        .catch(this._handleError);

      if (response) {
        return response.data || true;
      }
    }
    else {
      //создание
      const response = await axios.post(`${config.publicationURL}/applicationsFloatNSR/`, value)
        .catch(this._handleError);

      if (response) {
        return response.data || true;
      }
    }
  }

  async deleteApplicationFloat(id) {
    await this._deleteWorks(id);

    const response = await axios.delete(`${config.publicationURL}/applicationsFloatNSR/${id}`)
      .catch(this._handleError);

    if (response) {
      return true;
    }
  }

  async updateWorks(id, works) {

    await this._deleteWorks(id);
    const actions = works.map((item) => this._addWork({
      applicationId: id,
      ...item,
    }));

    return Promise.allSettled(actions);
  }

  async _deleteWorks(id) {
    const works = await this.loadApplicationFloatWorks(id);
    const actions = works.map((item) => this._deleteWork(item.id));

    return Promise.allSettled(actions);
  }

  async _addWork(value) {
    response = await axios.post(`${config.publicationURL}/applicationsFloatNsrWorks/`, value)
      .catch(this._handleError);

    if (!response) {
      return false;
    }

    return response.data || true;
  }

  async _deleteWork(id) {
    const response = await axios.delete(`${config.publicationURL}/applicationsFloatNsrWorks/${id}`)
      .catch(this._handleError);

    if (response) {
      return true;
    }
  }

  async updateTrackPoints(trackId, trackPoints) {

    if (trackId) {
      //сохранение
      const deleteResult = await this._deleteTrackPoints(trackId);

      if (!deleteResult) {
        return false;
      }

      return this._addTrackPoints(trackId, trackPoints);
    }
    else {
      //создание
      const response = await axios.post(`${config.publicationURL}/tracks/`, {})
        .catch(this._handleError);

      if (response) {

        const trackId = response.data.tid;
        await this._addTrackPoints(trackId, trackPoints);

        return { tid: trackId };
      }
    }
  }

  async _deleteTrackPoints(trackId) {
    const response = await axios.delete(`${config.publicationURL}/tracks/${trackId}/track-points`)
      .catch(this._handleError);

    if (response) {
      return true;
    }
  }

  async _addTrackPoints(trackId, trackPoints) {
    const actions = trackPoints.map((item) => this._addTrackPoint(trackId, item));
    const addResults = await Promise.allSettled(actions);
    return true;
  }

  async _addTrackPoint(trackId, point) {
    response = await axios.post(`${config.publicationURL}/tracks/${trackId}/track-points`, point)
      .catch(this._handleError);

    if (!response) {
      return false;
    }

    return response.data || true;
  }

  _prepareValueBeforeUpdate(value) {
    const result = JSON.parse(JSON.stringify(value));

    for (const field in result) {
      if (result[field] === null
        || result[field] === undefined) {
        delete result[field];
      }
    }

    return result;
  }

  _handleError(error) {
    if (error.response) {
      console.error(error.response.data);
    }
    else {
      console.error(error);
    }
  }

  async get(path) {
    const response = await axios(`${config.publicationURL}/${path}`)
      .catch(this._handleError);

    return response ? response.data : null;
  }

  async testCreateNotification() {
    const result = await axios.post(`${config.publicationURL}/notifications`, {
      "recipients": { "userIds": [1] },
      "reg_date": new Date(),
      "source_table": "applicationFloatNSR",
      "note": "Статус заявления «Согласовано» для string",
      sid_fk: 15,
    });

    console.log("create notification", result);
  }

  //let authToken = ""; 
  //let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE2NTQyNTkwMzEsImV4cCI6MTY1NDI4MDYzMX0.I5nKYGuUKk9WTtwyUEdmdPqEeaknv75BZJc984bnIjc";

  // async getAuth(path) {
  //   let token = this.getToken();
  //   if (!token) {
  //     await this.login();
  //     token = await this.getToken();
  //   }

  //   let response = await axios(`${config.publicationURL}/${path}`,
  //     {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .catch((err) => {
  //       this._handleError(err);

  //       if (err.status === 401) {
  //         //истек authToken          
  //       }
  //     });

  //   return response ? response.data : null;
  // }


  // getToken() {
  //   return authToken || localStorage.getItem("authToken");
  // }

  // async login() {
  //   //Перенаправить на логин

  //   authToken = null;
  //   localStorage.removeItem("authToken");

  //   const response = await axios.post(`${config.publicationURL}/users/login`, { login: '', password: '' })
  //     .catch(this._handleError);

  //   authToken = response ? response.data.token : null;
  //   localStorage.setItem("authToken", authToken);
  // }
}

export default new api();