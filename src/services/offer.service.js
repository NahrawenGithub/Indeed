import {axiosApiInstance} from "../interceptors";

class OffersDataService {
    constructor() {
        this.ApiUrl = "http://localhost:8083/api/offers/";
    }
    ApiUrl;
    getOffers() {
        return axiosApiInstance.get(this.ApiUrl+"getAllOffers");
    }
    createOffer(Offer) {
        console.log(Offer);
        return axiosApiInstance.post('http://localhost:8083/api/offers/CreateOffer', Offer);
    }
    getOfferById(OfferId) {
        return axiosApiInstance.get(this.ApiUrl+OfferId);
    }

    updateOffer(Offer, OfferId) {
        return axiosApiInstance.put(this.ApiUrl+"UpdateOffers" + '/' + OfferId, Offer);
    }

    deleteOffer(OfferId) {
        return axiosApiInstance.delete(this.ApiUrl+'DeleteOffer' + '/' + OfferId);
    }
}
export default new OffersDataService();