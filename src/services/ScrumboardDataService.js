import http from "../http-common";

class ScrumboardDataService {

  /* OK */
  getAll() {
    return http.get("/scrumboard");
  }

  get(id) {
    return http.get(`/scrumboard/${id}`);
  }

  create(data) {
    return http.post("/scrumboard", data);
  }

  update(id, data) {
    return http.put(`/scrumboard/${id}`, data);
  }

  delete(id) {
    return http.delete(`/scrumboard/${id}`);
  }

}

export default new ScrumboardDataService();