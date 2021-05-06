import http from "../http-common";

class WishlistDataService {

  /* OK */
  getAll() {
    return http.get("/wishlist");
  }

  get(id) {
    return http.get(`/wishlist/${id}`);
  }

  create(data) {
    return http.post("/wishlist", data);
  }

  update(id, data) {
    return http.put(`/wishlist/${id}`, data);
  }

  delete(id) {
    return http.delete(`/wishlist/${id}`);
  }

}

export default new WishlistDataService();