<template>
    <div>
        <div>Here are validation errors:</div>
        <ul class="error-messages">
            <li
                v-for="message in errorMessages"
                :key="message"
            >
                {{ message }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PfValidationErrors',
    props: {
        validationErrors: {
            required: true,
            errors: Object,
        }
    },
    computed: {
        errorMessages() {
            return Object.keys(this.validationErrors)
                .reduce((accum, key) => {
                    let errors = `${ key }: `;

                    this.validationErrors[key].forEach((value, index) => {
                        errors = index === 0 ? `${ errors }${value}` : `${value}`;
                    });

                    accum.push(errors);

                    return accum;
                }, []);
        },
    },
};
</script>