# How to Add Portfolio Activities Using Telegram

**For:** Shanthi Durga (and anyone updating the B.Ed portfolio)  
**No coding needed** — you only use the Telegram app on your phone or computer.

---

## What does this bot do?

Instead of typing each activity one by one on the website admin page, you can send your content to a **Telegram bot**. The bot saves it to your portfolio website automatically.

Your bot name: **[@PofolioBot](https://t.me/PofolioBot)**

---

## Before you start

1. Install **Telegram** on your phone (or use Telegram Desktop on a laptop).
2. Open this link and tap **Start**: [https://t.me/PofolioBot](https://t.me/PofolioBot)
3. The first time, your brother needs to allow your Telegram account (one-time setup). If the bot says *“Unauthorized”*, send `/myid` to the bot, copy the number, and ask him to add it.

---

## Words you will see

| Word | Meaning |
|------|---------|
| **Semester 1–4** | Which semester the activity belongs to |
| **Curricular** | Regular academic / classroom activities |
| **Co-Curricular** | Extra activities (games, events, clubs, etc.) |
| **Title** | Name of the activity (e.g. “Self Introduction”) |
| **Description** | Short paragraph about what you did |

---

## Method 1 — Add activities one by one (easiest to learn)

Use this when you want to send **title + photos** for each activity separately.

### Step 1 — Start

In the chat with **@PofolioBot**, type:

```
/import
```

Send it.

### Step 2 — Choose semester

The bot shows buttons: **Semester 1**, **Semester 2**, etc.  
**Tap** the semester you are working on (e.g. Semester 1).

### Step 3 — Choose type

Tap **Curricular** or **Co-Curricular**.

### Step 4 — Send the title

Type the activity name and send. Example:

```
Self Introduction
```

You can also send title **and** description together — title on the first line, description on the lines below:

```
Communication Game
We played a group communication activity in class.
```

### Step 5 — Add photos (or skip)

**If you have photos:**  
Send them one by one (or a few at a time). The bot will say “Image 1/4 added”, etc.

When you are done with photos for this activity, type:

```
/next
```

**If you have NO photos:**  
Just type:

```
/next
```

**If you only have text (no photos):**  
After the title, send the description as a normal message. The bot will save it and ask for the next title.

### Step 6 — Repeat for more activities

Send the **next title**, then photos (or `/next`), then the next title, and so on.

### Step 7 — Finish

When all activities for that semester and type are done, type:

```
/done
```

The bot will confirm how many activities were saved.

### Step 8 — Check the website

Open your portfolio website in the browser and **refresh the page**. You should see the new activities under the correct semester.

---

## Method 2 — Paste many activities at once (faster if you already wrote everything in Notes)

Use this when you have a **list of titles and descriptions** in Telegram, Notes, or WhatsApp.

### Step 1 — Start like before

```
/import
```

Choose **semester** and **Curricular** or **Co-Curricular**.

### Step 2 — Start paste mode

Type:

```
/paste
```

### Step 3 — Paste your list

Copy your text and send it in **one message**.

**Important rule:** Put a **blank line** (press Enter twice) between each activity.

**Example:**

```
Self Introduction
I introduced myself in the college auditorium.

Communication Game
Our class did a fun communication exercise.

Lesson Plan Presentation
I presented my lesson plan on fractions.
```

- **First line** of each block = **title**  
- **Lines below** = **description**

### Step 4 — Photos (optional)

**Option A — No photos for now**  
Type:

```
/skipimages
```

All activities will be saved without pictures. You can add photos later on the website admin page if needed.

**Option B — Add photos**  
The bot will ask for photos for the **first** activity. Send photos, then type:

```
/nextimage
```

Then photos for the **second** activity, and so on.

### Step 5 — Done

When finished, the bot confirms everything is saved. Refresh your portfolio website.

---

## Quick command list (copy these)

| Type this | When to use it |
|-----------|----------------|
| `/import` | Start adding activities |
| `/paste` | Paste many activities at once (after choosing semester & type) |
| `/next` | Finished photos for this activity — go to next |
| `/nextimage` | Finished photos for current activity (bulk paste mode) |
| `/skipimages` | Save bulk paste without any photos |
| `/done` | Finish and save everything (one-by-one mode) |
| `/cancel` | Stop and cancel if you made a mistake |
| `/help` | Bot shows help again |

---

## Example: Filling Semester 1 Co-Curricular

1. `/import`
2. Tap **Semester 1**
3. Tap **Co-Curricular**
4. Send: `Self Introduction`
5. Send your photo(s)
6. Send: `/next`
7. Send: `Communication Game`
8. Send photo(s) or `/next`
9. … repeat …
10. `/done`
11. Open website → refresh → check Semester 1

For **Semester 2**, start again with `/import` and choose Semester 2.

---

## Tips

- You can send up to **4 photos** per activity.
- If something goes wrong, type `/cancel` and start again with `/import`.
- Do **one semester + one type** at a time (e.g. all Semester 1 Co-Curricular, then Semester 1 Curricular).
- After saving, always **refresh** the portfolio website to see changes.
- Commands like `/import` must be sent **exactly** — with the slash `/` at the start.

---

## If something does not work

| Problem | What to do |
|---------|------------|
| Bot says **Unauthorized** | Send `/myid` to the bot, send the number to your brother |
| Bot does not reply | Check internet; close and reopen Telegram |
| Activities not on website | Wait 10 seconds, refresh the page; check you chose the right semester |
| Wrong semester or type | Delete on website admin, or ask for help to fix |
| Want to add photos later | Use the website **Admin → Content Manager** to edit that activity |

---

## Website admin (backup method)

If the bot is not working, you can still add content here:

1. Open the portfolio website  
2. Go to **Admin** → log in  
3. **Content Manager** → **Bulk Add** or **Add One**

---

**You’ve got this.** Start with one or two activities using Method 1. Once comfortable, use `/paste` to add many at once.
