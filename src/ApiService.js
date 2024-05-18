import axios from "axios";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description set the default HTTP request headers
   */
  static setHeader() {
    axios.defaults.headers.common["Accept"] = "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: any
   * @returns Promise<AxiosResponse>
   */
  static query(resource, params) {
    return axios.get(resource, { params });
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  static get(resource, slug = "") {
    return axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: any
   * @param config: any
   * @returns Promise<AxiosResponse>
   */
  static post(resource, params, config = {}) {
    return axios.post(resource, params, config);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: any
   * @returns Promise<AxiosResponse>
   */
  static update(resource, slug, params) {
    return axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: any
   * @returns Promise<AxiosResponse>
   */
  static put(resource, params) {
    return axios.put(resource, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  static delete(resource) {
    return axios.delete(resource);
  }
}

export default ApiService;
