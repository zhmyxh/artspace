export class Design {
    constructor(id, name, cover, author, rate, date, tags, views, bio) {
        this.id = id
        this.name = name
        this.cover = cover
        this.author = author
        this.rate = rate
        this.date = date
        this.tags = tags
        this.views = views
        this.bio = bio
    }
}

export class Review {
    constructor(id, text, name, design, author, date, rate) {
        this.id = id
        this.text = text
        this.name = name
        this.design = design
        this.author = author
        this.date = date
        this.rate = rate
    }
}

export class Rate {
    constructor(id, design, author, rate) {
        this.id = id,
            this.design = design,
            this.author = author,
            this.rate = rate
    }

    totalCounter(rate) {
        let t = rate.T
        let v = rate.V
        let d = rate.D
        let c = rate.C

        let oc = rate.OC
        let ti = rate.TI

        let total = ((t + v + d + c) / 40 * 50) + ((oc + ti) / 10 * 50)
        total = Math.floor(total)
        return total
    }
}