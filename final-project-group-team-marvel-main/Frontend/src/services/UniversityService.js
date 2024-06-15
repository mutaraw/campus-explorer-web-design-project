import api from "./UniversityApi";

class UniversityService {
  async getAllUniversities() {
    const response = await api.get("/search");
    console.log("API response: ", response.data);

    const uniqueUniversities = Array.from(new Set(response.data.map((uni) => uni.name))).map((name) => {
      return response.data.find((uni) => uni.name === name);
    });

    return uniqueUniversities;
  }

  async searchUniversitiesByName(name) {
    const response = await api.get("/search", { params: { name } });
    return response.data;
  }

  async searchUniversitiesByNameAndCountry(name, country) {
    const response = await api.get("/search", { params: { name, country } });
    return response.data;
  }
}

const universityServiceInstance = new UniversityService();
export default universityServiceInstance;
