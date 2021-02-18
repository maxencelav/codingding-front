import http from "../http-common";

class AchievementsDataService {

  /* OK */
  getAll() {
    return http.get("/achievements");
  }

  get(id) {
    return http.get(`/achievements/${id}`);
  }

  create(data) {
    return http.post("/achievements", data);
  }

  update(id, data) {
    return http.put(`/achievements/${id}`, data);
  }

  delete(id) {
    return http.delete(`/achievements/${id}`);
  }

}

export default new AchievementsDataService();