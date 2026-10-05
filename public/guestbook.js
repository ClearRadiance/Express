
async function loadMessages() {

    const list = document.querySelector('#guestbook-list');

    const listError = document.querySelector('#list-error');

    listError.textContent = '';

    try {

        const response = await fetch('/api/guestbook');

        const data = await response
            .json()
            .catch(() => ({}));

        if (!response.ok) {

            listError.textContent =
                data.error || 'Could not load messages.';

            return;

        }

        list.innerHTML = '';

        [...data].reverse().forEach(message => {

            const li = document.createElement('li');

            const name = document.createElement('strong');
            name.textContent = message.name;

            const date = document.createElement('small');
            date.textContent =
                new Date(message.createdAt).toLocaleString();

            const msg = document.createElement('p');
            msg.textContent = message.msg;

            li.append(name, ' ', date, msg);

            list.append(li);

        });

    } catch (err) {

        listError.textContent =
            'Could not reach the server. Check your connection.';

    }

}



document
    .querySelector('#guestbook-form')
    .addEventListener('submit', async (e) => {

        e.preventDefault();

        const errorBox =
            document.querySelector('#form-error');

        errorBox.textContent = '';

        try {

            const response = await fetch('/api/guestbook', {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json'

                },

                body: JSON.stringify({

                    name: document.querySelector('#name').value,

                    msg: document.querySelector('#msg').value

                })

            });

            const data = await response
                .json()
                .catch(() => ({}));

            if (!response.ok) {

                errorBox.textContent =
                    data.error ||
                    'Something went wrong. Please try again.';

                return;

            }

        } catch (err) {

            errorBox.textContent =
                'Could not reach the server. Check your connection.';

            return;

        }

        e.target.reset();

        loadMessages();

    });



loadMessages();
