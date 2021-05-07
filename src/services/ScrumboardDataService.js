import http from "../http-common";

class ScrumboardDataService {

  /* OK */
  getAll() {
    return http.get("/scrumboards");
  }

  get(id) {
    return http.get(`/scrumboards/${id}`);
  }

  create(data) {
    return http.post("/scrumboards", data);
  }

  update(id, data) {
    return http.put(`/scrumboards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/scrumboards/${id}`);
  }

  addMemberToScrum(id, data) {
    return http.put(`/scrumboards/${id}/addMember`, data)
  }

}

export default new ScrumboardDataService();