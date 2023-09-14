class Paginate {
  constructor(data, page, limit) {
    this.data = data;
    this.page = page;
    this.limit = limit;
  }

  async process() {
    console.log(this.data.length);
    // Melakukan paginasi secara manual
    const skip = (this.page - 1) * this.limit;
    const paginatedResults = this.data.slice(skip, skip + this.limit);

    console.log(this.data.length);
    console.log(this.limit);
    console.log(Math.ceil(this.data.length / this.limit));

    return {
      docs: paginatedResults,
      totalDocs: this.data.length,
      page: this.page,
      totalPages: Math.ceil(this.data.length / this.limit),
    };
  }
}

module.exports = Paginate;
