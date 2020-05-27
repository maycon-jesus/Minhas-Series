import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SerieService {
  constructor() {}

  baseURL: string = "http://api.localhost:5544";

  getSeries(): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/series`).then((r) => {
        if (r.status === 200) {
          r.json().then((series) => {
            resolve(series);
          });
        } else {
          r.text().then((t) => {
            reject(new Error(t));
          });
        }
      });
    });
  }

  getSerie(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/series/${id}`).then((r) => {
        if (r.status === 200) {
          r.json().then((series) => {
            resolve(series);
          });
        } else {
          r.text().then((t) => {
            reject(new Error(t));
          });
        }
      });
    });
  }

  create(serie): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/series/`, {
        method: "post",
        body: JSON.stringify(serie),
        headers: {
          "content-type": "application/json",
        },
      }).then((r) => {
        if (r.status === 200) {
          resolve();
        } else {
          r.text().then((t) => {
            reject(t);
          });
        }
      });
    });
  }

  save(serieID, serie): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/series/${serieID}`, {
        method: "put",
        body: JSON.stringify(serie),
        headers: {
          "content-type": "application/json",
        },
      }).then((r) => {
        if (r.status === 200) {
          resolve(serieID);
        } else {
          r.text().then((t) => {
            reject(t);
          });
        }
      });
    });
  }

  delete(serieID): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/series/${serieID}`, {
        method: "delete",
      }).then((r) => {
        if (r.status === 200) {
          resolve();
        } else {
          r.text().then((t) => {
            reject(t);
          });
        }
      });
    });
  }

  saveTemporada(serieID, temporadaID, temporada): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/series/${serieID}/${temporadaID}`, {
        method: "put",
        body: JSON.stringify(temporada),
        headers: {
          "content-type": "application/json",
        },
      }).then((r) => {
        if (r.status === 200) {
          resolve();
        } else {
          r.text().then((t) => {
            reject(t);
          });
        }
      });
    });
  }

  deleteTemporada(serieID, temporadaID): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}/series/${serieID}/${temporadaID}`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
      }).then((r) => {
        if (r.status === 200) {
          resolve();
        } else {
          r.text().then((t) => {
            reject(t);
          });
        }
      });
    });
  }
}
