import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { API } from "../api/api";

import Navbar from "../components/Navbar";

export default function CreateSurvey() {

  const [questions, setQuestions] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [selected, setSelected] =
    useState([]);

  const [visibleCount, setVisibleCount] =
    useState(4);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [newQuestion, setNewQuestion] =
    useState("");

  const [newOptions, setNewOptions] =
    useState(["", ""]);

  const nav = useNavigate();


  // =====================================
  // FETCH CATEGORIES
  // =====================================

  useEffect(() => {

    fetchCategories();

  }, []);


  const fetchCategories = async () => {

    try {

      const res =
        await API.get("/categories");

      setCategories(res.data);

      // set first category automatically
      if (res.data.length > 0) {
        setCategory(res.data[0]._id);
      }

    } catch (err) {

      console.log(err);
    }
  };


  // =====================================
  // FETCH QUESTIONS
  // =====================================

  useEffect(() => {

    if (category) {
      fetchQuestions();
    }

  }, [category]);


  const fetchQuestions = async () => {

    try {

      const res =
        await API.get(
          `/questions/category/${category}`
        );

      setQuestions(res.data);

    } catch (err) {

      console.log(err);

      setQuestions([]);
    }
  };


  // =====================================
  // SELECT QUESTION
  // =====================================

  const toggleSelect = (id) => {

    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id]
    );
  };


  // =====================================
  // CREATE SURVEY
  // =====================================

  const createSurvey = async () => {

    try {

      if (!title.trim()) {
        return alert(
          "Enter survey title"
        );
      }

      if (selected.length === 0) {
        return alert(
          "Select at least one question"
        );
      }

      const selectedQuestions =
        questions
          .filter((q) =>
            selected.includes(q._id)
          )
          .map((q) => ({
            questionText:
              q.questionText,

            options:
              q.options.map(
                (opt) => ({
                  text: opt.text,
                })
              ),
          }));

      await API.post(
        "/surveys",
        {
          title,

          category,

          questions:
            selectedQuestions,
        }
      );

      alert(
        "Survey Created 🚀"
      );

      nav("/surveys");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.msg ||
          "Error creating survey"
      );
    }
  };


  // =====================================
  // LOAD MORE
  // =====================================

  const loadMore = () => {

    setVisibleCount(
      (prev) => prev + 4
    );
  };


  // =====================================
  // OPTION CHANGE
  // =====================================

  const handleOptionChange = (
    index,
    value
  ) => {

    const updated =
      [...newOptions];

    updated[index] = value;

    setNewOptions(updated);
  };


  // =====================================
  // ADD OPTION
  // =====================================

  const addOption = () => {

    setNewOptions([
      ...newOptions,
      "",
    ]);
  };


  // =====================================
  // CREATE QUESTION
  // =====================================

  const createQuestion =
    async () => {

      try {

        if (
          !newQuestion.trim()
        ) {
          return alert(
            "Enter question"
          );
        }

        const formattedOptions =
          newOptions
            .filter(
              (o) =>
                o.trim() !== ""
            )
            .map((o) => ({
              text: o,
            }));

        if (
          formattedOptions.length <
          2
        ) {
          return alert(
            "Add at least 2 options"
          );
        }

        await API.post(
          "/questions",
          {
            questionText:
              newQuestion,

            type: "mcq",

            category,

            options:
              formattedOptions,
          }
        );

        fetchQuestions();

        alert(
          "Question Added ✅"
        );

        setNewQuestion("");

        setNewOptions([
          "",
          "",
        ]);

        setShowModal(false);

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data?.msg ||
            "Failed"
        );
      }
    };


  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "30px",
        }}
      >

        <h1>
          Create Survey
        </h1>

        <input
          placeholder="Survey title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <br />
        <br />

        {/* CATEGORY */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >

          {categories.map(
            (cat) => (

              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>
            )
          )}

        </select>

        <br />
        <br />

        {/* QUESTIONS */}

        {questions.length === 0 ? (

          <p>
            No questions found
          </p>

        ) : (

          questions
            .slice(
              0,
              visibleCount
            )
            .map((q) => (

              <div
                key={q._id}
                onClick={() =>
                  toggleSelect(
                    q._id
                  )
                }
                style={{
                  padding: "10px",

                  marginTop: "10px",

                  background:
                    selected.includes(
                      q._id
                    )
                      ? "green"
                      : "#eee",

                  cursor:
                    "pointer",
                }}
              >
                {q.questionText}
              </div>
            ))
        )}

        <br />

        {visibleCount <
          questions.length && (

          <button
            onClick={
              loadMore
            }
          >
            Load More
          </button>
        )}

        <button
          onClick={() =>
            setShowModal(true)
          }
        >
          + Create Question
        </button>

        <br />
        <br />

        <button
          onClick={
            createSurvey
          }
        >
          Create Survey
        </button>

      </div>

      {/* MODAL */}

      {showModal && (

        <div>

          <input
            placeholder="Question"
            value={newQuestion}
            onChange={(e) =>
              setNewQuestion(
                e.target.value
              )
            }
          />

          {newOptions.map(
            (
              opt,
              index
            ) => (

              <input
                key={index}
                placeholder={`Option ${
                  index + 1
                }`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(
                    index,
                    e.target.value
                  )
                }
              />
            )
          )}

          <button
            onClick={
              addOption
            }
          >
            + Add Option
          </button>

          <button
            onClick={
              createQuestion
            }
          >
            Save Question
          </button>

          <button
            onClick={() =>
              setShowModal(false)
            }
          >
            Close
          </button>

        </div>
      )}
    </>
  );
}