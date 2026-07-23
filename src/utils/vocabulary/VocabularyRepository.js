export const VocabularyRepository = {

    getAll(lesson) {

        return lesson.vocabulary ?? [];

    },

    findById(lesson, id) {

        return this.getAll(lesson).find(

            item => item.id === id

        );

    },

    findByWord(lesson, word) {

        return this.getAll(lesson).find(

            item =>

                item.word.toLowerCase() ===

                word.toLowerCase()

        );

    },

    exists(lesson, word) {

        return !!this.findByWord(

            lesson,

            word

        );

    }

};