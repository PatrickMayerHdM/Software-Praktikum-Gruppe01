import { useState } from "react";

function OnBoarding() {
  /** Die Komponente gibt ein div-Element mit einem h1-Element aus,
    das den Text "OnBoarding" enthält. */

  const handleChange = () => {
      console.log("chaned")
  }
    const handleSubmit = () => {
      console.log("submitted")
  }

  return (
    <div className="onboarding">
        <h2> CREATE PROFILE </h2>

        <from onSubmit={handleSubmit}>

            <section>

                <label htmlFor="first_name"> First Name </label>
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    required={true}
                    value={""}
                    onChange={handleChange}
                />
                <label htmlFor="last_name"> Last Name </label>
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    required={true}
                    value={""}
                    onChange={handleChange}
                />
                <label> Birthday </label>
                <div className="mulit-input-container">
                <input
                    id="dob_day"
                    type="number"
                    name="dob_day"
                    placeholder="DD"
                    required={true}
                    value={""}
                    onChange={handleChange}
                />
                <input
                    id="dob_month"
                    type="number"
                    name="dob_month"
                    placeholder="MM"
                    required={true}
                    value={""}
                    onChange={handleChange}
                />
                <input
                    id="dob_year"
                    type="number"
                    name="dob_year"
                    placeholder="YYYY"
                    required={true}
                    value={""}
                    onChange={handleChange}
                />
                </div>
                <label> Gender </label>
                <div className="mulit-input-container">
                <input
                    id="man-gender-identity"
                    type="radio"
                    name="gender_indentity"
                    value="man"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="man-gender-identity"> Man </label>
                <input
                    id="woman-gender-identity"
                    type="radio"
                    name="gender_indentity"
                    value="woman"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="woman-gender-identity"> Woman </label>
                <input
                    id="more-gender-identity"
                    type="radio"
                    name="gender_indentity"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="more-gender-identity"> More </label>
                </div>
                <label> How tall are you ? </label>
                <div className="mulit-input-container">
                <input
                    id="tall_number"
                    type="number"
                    name="size_of_person"
                    placeholder="cm"
                    required={true}
                    value={""}
                    onChange={handleChange}
                />
                </div>
                <label> What religion are you? </label>
                <div className="mulit-input-container">
                <input
                    id="christianity"
                    type="radio"
                    name="religious_identity"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="religious-identity"> Christianity </label>
                    <input
                    id="buddhism"
                    type="radio"
                    name="religious_identity"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="religious-identity"> Buddhism </label>
                    <input
                    id="judaism"
                    type="radio"
                    name="religious_identity"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="religious-identity"> Judasim </label>
                    <input
                    id="islam"
                    type="radio"
                    name="religious_identity"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="religious-identity"> Islam </label>
                <input
                    id="religion_individual_selection"
                    type="text"
                    name="religios_identity"
                    placeholder="individual selection"
                    value={""}
                    onChange={handleChange}
                />
                    <label htmlFor="custom-text-field"> Individual Selection </label>
                </div>
                <label> What color is your hair? </label>
                <div className="mulit-input-container">
                <input
                    id="black"
                    type="radio"
                    name="hair_color"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="hair-color-selection"> Black </label>
                    <input
                    id="brown"
                    type="radio"
                    name="hair_color"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="hair-color-selection"> Brown </label>
                    <input
                    id="red"
                    type="radio"
                    name="hair_color"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="hair-color-selection"> Red </label>
                    <input
                    id="Blond"
                    type="radio"
                    name="hair_color"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="hair-color-selection"> Blond </label>
                    <input
                    id="hair_individual_selection"
                    type="text"
                    name="hair_color"
                    placeholder="individual selection"
                    value={""}
                    onChange={handleChange}
                />
                    <label htmlFor="custom-text-field"> Individual Selection </label>
                </div>
                <label> Do you smoke? </label>
                <div className="mulit-input-container">
                <input
                    id="yes"
                    type="radio"
                    name="is_somking_question"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="smoking-selection"> Yes </label>
                    <input
                    id="no"
                    type="radio"
                    name="is_somking_question"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="smoking-selection"> No </label>
                    <input
                    id="sometimes"
                    type="radio"
                    name="is_somking_question"
                    value="more"
                    onChange={handleChange}
                    checked={false}
                />
                    <label htmlFor="smoking-selection"> Sometimes </label>
                </div>
                <label> Do you have anything else to say?  </label>
                <div className="mulit-input-container">
                <input
                    id="more_to_say_individual_selection"
                    type="text"
                    name="more_to_say"
                    placeholder="type..."
                    value={""}
                    onChange={handleChange}
                />
                    </div>

            </section>

        </from>

    </div>
  );
}

/** Die Komponente wird für den Export als Standard exportiert. */
export default OnBoarding;
