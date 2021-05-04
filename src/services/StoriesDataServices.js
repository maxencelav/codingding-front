import http from "../http-common";

class StoryDataService {

  /* OK */
  getAll() {
    return http.get("/stories");
  }

  get(id) {
    return http.get(`/stories/${id}`);
  }

  create(data) {
    return http.post("/stories", data);
  }

  update(id, data) {
    return http.put(`/stories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/stories/${id}`);
  }

  getAllFromScrum(id) {
    return http.get(`/stories/scrumboard/${id}`)
  }

}

export default new StoryDataService();